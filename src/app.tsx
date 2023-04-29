import { useEffect } from 'react';
import { AxiosProvider, useAxios } from '@lib';

export default function App() {
  return (
    <AxiosProvider
      config={{
        baseURL: 'https://github.com/hungtcs',
        headers: {
          "Authorization": "Basic xxxx",
        },
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
      <Test1 />
      <AxiosProvider
        config={{
          headers: {
            TEST2: 'test2',
          },
        }}>
        <Test2 />
      </AxiosProvider>
    </AxiosProvider>
  )
}

function Test1() {
  const axios = useAxios();

  useEffect(
    () => {
      const ac = new AbortController();
      axios.get('/test1', { signal: ac.signal });

      return () => {
        ac.abort();
      };
    },
    [axios],
  );


  return null;
}

function Test2() {
  const axios = useAxios();

  useEffect(
    () => {
      const ac = new AbortController();
      axios.get('/test2', { signal: ac.signal });

      return () => {
        ac.abort();
      };
    },
    [axios],
  );


  return null;
}
