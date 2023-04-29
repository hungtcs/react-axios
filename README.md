# React Axios

React Axios is a React library based on Axios that aims to provide better HTTP request handling
capabilities for React applications. The library provides an AxiosProvider component that makes
it easy to use Axios throughout your entire React application, and includes a useAxios hook
and some customizable interceptors.

## Installation

```shell
npm install @cicara/react-axios
```

## Usage

To use Axios in your React components, you need to provide an AxiosProvider component in your
application. In the AxiosProvider component, you can set the configuration for the Axios instance,
and add interceptors for custom handling.

```tsx
import { useEffect } from "react";
import { useAxios, AxiosProvider } from "@cicara/react-axios";

function TestAxios() {
  const axios = useAxios();

  useEffect(
    () => {
      const ac = new AbortController();

      // GET request to `/base/url/test?_t=1682750920279`
      axios.get("/test", { signal: ac.signal })
        .catch((err) => {
          console.error(err);
        });

      return () => {
        ac.abort();
      };
    }, 
    [axios],
  );

  return (
    <div>Axios Test</div>
  );
}

export default function App() {
  return (
    <AxiosProvider
      config={{
        baseURL: "/base/url"
      }}
      interceptors={[
        {
          name: "timestamp",
          request: {
            onFulfilled(request) {
              request.params = {
                _t: Date.now(),
                ...request.params,
              };
              return request;
            }
          }
        }
      ]}>
      <TestAxios />
      <AxiosProvider
        config={{
          baseURL: "/base/url2"
        }}
        interceptors={[
          {
            name: "auth",
            request: {
              onFulfilled(request) {
                request.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
                return request;
              }
            }
          }
        ]}>
        <TestAxios />
      </AxiosProvider>
    </AxiosProvider>
  );
}
```
