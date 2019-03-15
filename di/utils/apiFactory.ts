import { ClassType } from 'class-transformer/ClassTransformer';
import { interfaces } from 'inversify';
import { AppConfigurationService, IConfigFields } from '../../config';
import { Api } from '../../core/api';
import { log } from '../../core/logger';
import { TRequestMethod } from '../bindings/bindApiService';
import { errorResponseInterceptor, responseInterceptor } from './interceptors';
import { makeAxiosInstance } from './makeAxiosInstance';

/**
 * @deprecated
 */
export function apiFactory(context: interfaces.Context) {
  // cause it singleton
  const configurationService = context.container.get(AppConfigurationService);

  return newDesignedFactory(configurationService);
}

interface IApiFactoryCfg<D, E> {
  apicfg?: keyof IConfigFields['internalApi'];
  method?: TRequestMethod;
  endpoint?: string;
  dto: ClassType<D>;
  errorDto?: ClassType<E>;
}

type TNewArgsFn = <D, E = {}>(config: IApiFactoryCfg<D, E>) => Api<D, E>;
type TOldArgsFn = <D, E = {}>(
  cfgOrArgs: keyof IConfigFields['internalApi'],
  method: TRequestMethod,
  endpoint: string,
  dto: ClassType<D>,
  errorDto?: ClassType<E>,
) => Api<D, E>;
type TNewMergedArgsFn = <D, E = {}>(
  cfgOrArgs: keyof IConfigFields['internalApi'] | IApiFactoryCfg<D, E>,
  method?: TRequestMethod,
  endpoint?: string,
  dto?: ClassType<D>,
  errorDto?: ClassType<E>,
) => Api<D, E>;

export function newDesignedFactory(c: AppConfigurationService): TNewArgsFn;
export function newDesignedFactory(c: AppConfigurationService): TOldArgsFn;
export function newDesignedFactory(c: AppConfigurationService): TNewMergedArgsFn {
  return <D, E = {}>(
    cfgOrArgs: keyof IConfigFields['internalApi'] | IApiFactoryCfg<D, E>,
    method?: TRequestMethod,
    endpoint?: string,
    dto?: ClassType<D>,
    errorDto?: ClassType<E>,
  ) => {
    let params: Required<IApiFactoryCfg<D, E>>;
    if (typeof cfgOrArgs === 'string' || typeof cfgOrArgs === 'number') {
      log('system').warn('you are using a deprecated ApiFactory Api with' +
        'inline arguments. This API will be removed soon');
      params = {
        apicfg: cfgOrArgs,
        method: method!,
        errorDto: errorDto!,
        dto: dto!,
        endpoint: endpoint!,
      };
    } else {
      const defaults = { apicfg: 'defaultApi', endpoint: '/', method: 'GET', errorDto: {} };
      params = Object.assign({}, cfgOrArgs, defaults);
    }
    // creating instance with predefined data from factory, we can't change this parameters later
    const apiConfiguration = makeAxiosInstance(
      c,
      params.apicfg,
      params.method,
      params.endpoint,
    );

    apiConfiguration.interceptors.response
      .use(responseInterceptor(params.dto), errorResponseInterceptor(params.errorDto));

    return new Api(apiConfiguration);
  };
}
