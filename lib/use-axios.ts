import axios, { CreateAxiosDefaults, mergeConfig } from 'axios';
import { useMemo } from 'react';
import { useAxiosContext } from './context';

export function useAxios<D = any>(instanceConfig?: CreateAxiosDefaults<D>) {
  const context = useAxiosContext();

  const instance = useMemo(
    () => {
      const instance = axios.create(mergeConfig(context.config, instanceConfig));

      for (const interceptor of context.interceptors) {
        if (interceptor.request) {
          const request = interceptor.request;
          instance.interceptors.request.use(
            request.onFulfilled,
            request.onRejected,
            {
              runWhen: request.runWhen,
              synchronous: request.synchronous,
            },
          );
        }
        if (interceptor.response) {
          const response = interceptor.response;
          instance.interceptors.response.use(
            response.onFulfilled,
            response.onRejected,
            {
              runWhen: response.runWhen,
              synchronous: response.synchronous,
            },
          );
        }
      }

      return instance;
    },
    [context.config, context.interceptors, instanceConfig],
  );

  return instance;
}
