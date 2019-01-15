import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ConfigurationService } from '../../config/service/ConfigurationService';
import { container } from '../../stores/provider/container';

export function axiosMockFactory(responseFactory: (config: AxiosRequestConfig) => Promise<AxiosResponse>) {
  const configService = container.get(ConfigurationService);
  const { defaultApi } = configService.publicRuntimeConfig.apis;

  return axios.create({
    ...defaultApi,
    adapter: (config) => responseFactory(config)
  });
}
