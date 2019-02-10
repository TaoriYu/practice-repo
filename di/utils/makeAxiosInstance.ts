import axios from 'axios';
import { AppConfigurationService, IConfigFields } from '../../config';
import { TRequestMethod } from '../bindings/bindApiService';

export function makeAxiosInstance(
  configurationService: AppConfigurationService,
  apicfg: keyof IConfigFields['apis'],
  method: TRequestMethod,
  url: string,
) {
  return axios.create({
    ...configurationService.publicRuntimeConfig.apis[apicfg],
    method,
    url,
    // empty response to have an empty JSON.
    transformResponse: [(rawData) => JSON.parse(rawData || '{}')],
  });
}
