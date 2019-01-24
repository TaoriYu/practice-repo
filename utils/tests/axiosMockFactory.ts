import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AppConfigurationService } from '../../config';
import { container } from '../../di/container';

const defaultAxiosResponse200: OmitKeys<AxiosResponse, 'config'> = {
  statusText: 'OK',
  status: 200,
  headers: [],
  data: {},
};

const defaultAxiosResponse500: OmitKeys<AxiosResponse, 'config'> = {
  statusText: 'SERVER ERROR',
  status: 500,
  headers: [],
  data: {},
};

type TResponseFactory<D extends object = {}>
  = ((config: AxiosRequestConfig) => Promise<AxiosResponse<D>>)
  | D
  | OmitKeys<AxiosResponse<D>, 'config'>;

export function axiosMockFactory<D extends object = {}>(
  responseFactory: TResponseFactory<D>,
  type: boolean = true,
): AxiosInstance {
  const configService = container.get(AppConfigurationService);
  const { defaultApi } = configService.publicRuntimeConfig.apis;

  let adapter: ((config: AxiosRequestConfig) => Promise<AxiosResponse<D>>);

  if (typeof responseFactory === 'function') {
    adapter = responseFactory as ((config: AxiosRequestConfig) => Promise<AxiosResponse<D>>);
  } else if ('data' in responseFactory) {
    adapter = type
      ? (config) => Promise.resolve(Object.assign({}, responseFactory, { config }))
      : (config) => Promise.reject(Object.assign({}, responseFactory, { config }));
  } else {
    const resolver = (resp: OmitKeys<AxiosResponse, 'config'>) => (config: AxiosRequestConfig) =>
      Promise.resolve(
        Object.assign({}, resp, { data: responseFactory }, { config }),
      );
    adapter = type ? resolver(defaultAxiosResponse200) : resolver(defaultAxiosResponse500);
  }

  return axios.create({
    ...defaultApi,
    adapter,
  });
}
