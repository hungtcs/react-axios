import { Interceptor } from './interceptor';
import { CreateAxiosDefaults, mergeConfig } from 'axios';
import { PropsWithChildren, createContext, useContext, useMemo } from 'react';

export interface AxiosContextObject<D = any> {
  config: CreateAxiosDefaults<D>;
  interceptors: Array<Interceptor>;
}

export const AxiosContext = createContext<AxiosContextObject>({
  config: {},
  interceptors: [],
});

export function useAxiosContext<D = any>(): AxiosContextObject<D> {
  return useContext(AxiosContext);
}

export function AxiosProvider<D>(props: PropsWithChildren<Partial<AxiosContextObject<D>>>) {
  const { children } = props;

  const context = useContext(AxiosContext);

  const config = useMemo(() => mergeConfig(context.config, props.config), [context.config, props.config]);
  const interceptors = useMemo(() => [...context.interceptors, ...(props.interceptors ?? [])], [context.interceptors, props.interceptors]);

  return (
    <AxiosContext.Provider value={{ config, interceptors }}>
      {children}
    </AxiosContext.Provider>
  );
}
