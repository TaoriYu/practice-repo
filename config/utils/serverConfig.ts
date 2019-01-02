import { TBuildedConfigFields } from '../types/internals';

/**
 * Возвращает serverRuntimeConfig из nextJSConfig, если указан key вернет свойство key из
 * publicRuntimeConfig
 * @param {T} key - ключ из конфигурации
 * @returns {IConfigFields | IConfigFields[T]}
 * @example
 *  const { apis: defaultUrl } = serverConfig();
 *  console.log(defaultUrl) // -> localhost;
 *  // another
 *  const { defaultUrl } = serverConfig('apis');
 *  console.log(defaultUrl) // -> localhost;
 */
export function serverConfig<T extends keyof TBuildedConfigFields>(key: T): TBuildedConfigFields[T];
export function serverConfig(): TBuildedConfigFields;
export function serverConfig<T extends keyof TBuildedConfigFields>(key?: T): TBuildedConfigFields | TBuildedConfigFields[T] {
  let serverRuntimeConfig = {} as TBuildedConfigFields;
  if (process.env.IS_SERVER) {
    // tslint:disable-next-line:no-require-imports
    serverRuntimeConfig = require('../dist/config.private.json').serverRuntimeConfig;
  }

  return key ? serverRuntimeConfig[key] : serverRuntimeConfig;
}
