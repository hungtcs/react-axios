import 'axios';

declare module 'axios' {
  export function mergeConfig(config1: CreateAxiosDefaults, config2?: CreateAxiosDefaults): CreateAxiosDefaults;
}
