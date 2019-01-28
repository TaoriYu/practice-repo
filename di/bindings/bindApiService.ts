import axios from 'axios';
import { Container } from 'inversify';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { IConfigFields, AppConfigurationService } from '../../config';
import { Api } from '../../core/api';

export type TRequestMethod = 'GET' | 'PATCH' | 'PUT' | 'POST' | 'DELETE';
export type TApiFactory = <D>(
  apicfg: keyof IConfigFields['apis'],
  method: TRequestMethod,
  endpoint: string,
  dto: ClassType<D>,
) => Api<D>;

/** dirty hack for reflect-metadata supports while injecting */
export const TApiFactory = Symbol.for('TApiFactory');

export function bindApiService(container: Container) {
  // unique identifier for Api class, we can't inject Api itself but we need a way to inject it
  // throw factory
  container.bind(TApiFactory).toFactory((context) =>
    <D>(
      apicfg: keyof IConfigFields['apis'],
      method: TRequestMethod,
      endpoint: string,
      dto: ClassType<D>,
    ) => {
      const configurationService = context.container.get(AppConfigurationService);
      // creating instance with predefined data from factory, we can't change this parameters later
      const apiConfiguration =
        makeAxiosInstance<D>(configurationService, apicfg, method, endpoint, dto);

      return new Api(apiConfiguration);
    });
}

function makeAxiosInstance<D>(
  configurationService: AppConfigurationService,
  apicfg: keyof IConfigFields['apis'],
  method: TRequestMethod,
  url: string,
  dto: ClassType<D>,
) {
  return axios.create({
    ...configurationService.publicRuntimeConfig.apis[apicfg],
    method,
    url,
    transformResponse: [
      (rawData) => plainToClass(dto, JSON.parse(rawData), { strategy: 'excludeAll' }),
    ],
  });
}
