import axios from 'axios';
import { AppConfigurationService, IConfigFields } from '../../config';
import { container } from '../../core/provider/container';
import { TRequestMethod } from '../bindings/bindApiService';
import { isEmpty, path } from 'ramda';

export function makeAxiosInstance(
  configurationService: AppConfigurationService,
  apicfg: keyof IConfigFields['internalApi'],
  method: TRequestMethod,
  url: string,
) {

  return axios.create({
    ...getApiFromConfig(apicfg),
    method,
    url,
    // empty response to have an empty JSON.
    transformResponse: [(rawData) => JSON.parse(isEmpty(rawData) ? '{}' : rawData)],
  });
}

function getApiFromConfig(key: keyof IConfigFields['internalApi']) {
  const apiPath = process.env.IS_SERVER
    ? ['serverRuntimeConfig', 'internalApi', key]
    : ['publicRuntimeConfig', 'externalApi', key];

  return path(apiPath, container.get(AppConfigurationService));
}
