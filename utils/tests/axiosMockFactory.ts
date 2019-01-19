import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AppConfigurationService } from '../../config';
import { container } from '../../core/provider/container';

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

export function axiosMockFactory<D extends object = {}>(
  responseFactory: ((config: AxiosRequestConfig) => Promise<AxiosResponse<D>>) | D | OmitKeys<AxiosResponse<D>, 'config'>,
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
    adapter = type
      ? (config) =>
        Promise.resolve(Object.assign({}, defaultAxiosResponse200, { data: responseFactory }, { config }))
      : (config) =>
        Promise.reject(Object.assign({}, defaultAxiosResponse500, { data: responseFactory }, { config }));
  }

  return axios.create({
    ...defaultApi,
    adapter,
  });
}
