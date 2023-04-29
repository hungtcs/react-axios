# React Axios

## Installation

```shell
npm install @cicara/react-axios
```

## Usage

```ts
import { useEffect } from 'react';
import { useAxios, AxiosProvider } from '@cicara/react-axios';

export default function App() {

  return (
    <AxiosProvider
      config={{
        baseURL: '/base/url',
      }}
      interceptors={[
        {
          name: "timestamp",
          request: {
            onFulfilled(request) {
              request.params = {
                _t: Date.now(),
                ...request.params,
              }
              return request;
            },
          },
        },
      ]}>
      <TestAxios />
    </AxiosProvider>
  );
}

function TestAxios() {
  const axios = useAxios();

  useEffect(
    () => {
      const ac = new AbortController();

      // GET request to `/base/url/test?_t=1682750920279`
      axios.get('/test', { signal: ac.signal });

      return () => {
        ac.abort();
      };
    },
    [],
  );

  return null;
}
```
