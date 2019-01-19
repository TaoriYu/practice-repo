import axios from 'axios';
import { Container } from 'inversify';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { IConfigFields } from '../../config/IConfig';
import { Api } from '../../core/api';
import { AppConfigurationService } from '../../config';

export type TRequestMethod = 'GET' | 'PATCH' | 'PUT' | 'POST' | 'DELETE';
export type TApiFactory = <D>(apicfg: keyof IConfigFields['apis'], method: TRequestMethod, endpoint: string, dto: ClassType<D>) => Api<D>;
/** dirty hack for reflect-metadata supports while injecting */
export const TApiFactory = {};

export function bindApiService(container: Container) {
  /* unique identifier for Api class, we can't inject Api itself but we need a way to inject it throw factory */
  const identifier = Symbol.for(Api.toString());
  container.bind(identifier).toConstructor(Api);
  container.bind(Api).toFactory((context) =>
    <D>(apicfg: keyof IConfigFields['apis'], method: TRequestMethod, endpoint: string, dto: ClassType<D>) => {
      const apiConstructor = context.container.get<typeof Api>(identifier);
      const configurationService = context.container.get(AppConfigurationService);
      /* creating instance with predefined data from factory, we can't change this parameters later */
      const apiConfiguration = makeAxiosInstance<D>(configurationService, apicfg, method, endpoint, dto);

      return new apiConstructor(apiConfiguration);
    });
}

function makeAxiosInstance<D>(
  configurationService: AppConfigurationService,
  apicfg: keyof IConfigFields['apis'],
  method: TRequestMethod,
  url: string,
  dto: ClassType<D>
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
