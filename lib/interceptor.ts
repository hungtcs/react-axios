import { AxiosInterceptorManager, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

type OnFulfilled<V> = Parameters<AxiosInterceptorManager<V>['use']>[0];
type OnRejected<V> = Parameters<AxiosInterceptorManager<V>['use']>[1];

type InterceptorConfig<V> =
  {
    runWhen?: (config: InternalAxiosRequestConfig) => boolean;
    synchronous?: boolean;
  } & (
    {
      onRejected: OnRejected<V>;
      onFulfilled?: OnFulfilled<V>,
    } | {
      onRejected?: OnRejected<V>;
      onFulfilled: OnFulfilled<V>,
    }
  );

export type Interceptor =
  {
    name: string;
  } & (
    {
      request: InterceptorConfig<InternalAxiosRequestConfig>;
      response?: InterceptorConfig<AxiosResponse>;
    } | {
      request?: InterceptorConfig<InternalAxiosRequestConfig>;
      response: InterceptorConfig<AxiosResponse>;
    }
  );
