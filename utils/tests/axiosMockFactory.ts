import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AppConfigurationService } from '../../config';
import { container } from '../../di/container';
// tslint:disable-next-line:no-require-imports
const settle = require('axios/lib/core/settle');

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

type Adapter<D extends object = {}> = ((config: AxiosRequestConfig) => Promise<AxiosResponse<D>>);

export function axiosMockFactory<D extends object = {}>(
  responseFactory: TResponseFactory<D>,
  type: boolean = true,
): AxiosInstance {
  const configService = container.get(AppConfigurationService);
  const { defaultApi } = configService.publicRuntimeConfig.internalApi;

  let adapter: Adapter<D>;

  if (typeof responseFactory === 'function') {
    adapter = responseFactory as Adapter<D>;
  } else if ('data' in responseFactory) {
    adapter = makeTestAdapter(responseFactory, type) as Adapter<D>;
  } else {
    adapter = makeTestAdapter({ data: responseFactory }, type) as Adapter<D>;
  }

  return axios.create({
    ...defaultApi,
    adapter,
  });
}

function makeErrorResponse<D>(config: AxiosRequestConfig, data: D) {
  return Object.assign(
    {},
    defaultAxiosResponse500,
    data,
    { config },
  );
}

function makeResponse<D>(config: AxiosRequestConfig, data: D) {
  return Object.assign(
    {},
    defaultAxiosResponse200,
    data,
    { config },
  );
}

function makeTestAdapter<D>(data: D, isSuccess: boolean):
  (config: AxiosRequestConfig) => Promise<AxiosResponse<D>> {
  return (config: AxiosRequestConfig) => {
    return new Promise((resolve, reject) => {
      const response = isSuccess ? makeResponse(config, data) : makeErrorResponse(config, data);
      settle(resolve, reject, response);
    });
  };
}
