import {
  ICompiledConfiguration,
  IConfig,
  IConfigGroup,
  OptionalEnv,
  RequiredEnv,
  TMakeCompiled,
  TReturnConfigGroup,
} from '../types/internals';

/**
 * Преобразует конфигурацию таким образом, что-бы поля содержащие ключ public помещались в
 * publicRuntimeConfiguration, ключи без public или с public: false помещались в serverRuntimeConfiguration
 * @param cfg - Конфиг над которым будет совершено преобразование
 * @param cfgPart - Объект который будет помещен в нужный раздел конфига
 * @param cfgPartName - ключ в конфиге в который бдует помещен объект
 * @returns - итоговый конфиг nextjs конфигурация.
 * @example
 * const apiConf = { defaultApi: { baseURL: 'some', public: true }, internalApi: { baseURL: 'other' } }
 * const defaultNextConfig = {
 *  publicRuntimeConfig: {
 *    apis: {},
 *  },
 *  serverRuntimeConfig: {
 *    apis: {},
 *  },
 * }
 * const nextConfig = transform(defaultNextConfig, apiConf, 'apis');
 * console.log(nextConfig) // -> {
 *  publicRuntimeConfig: {
 *    apis: { defaultApi: { baseURL: 'some', public: true } },
 *  },
 *  serverRuntimeConfig: {
 *    apis: { internalApi: { baseURL: 'other' } },
 *  },
 * }
 */
export function transform<Fields extends TReturnConfigGroup<Fields>, T extends IConfigGroup>(
  cfg: IConfig<Fields>,
  cfgPart: T,
  cfgPartName: keyof Fields,
): ICompiledConfiguration<TMakeCompiled<Fields>> {
  const env =
    (process.env.CONFIG_ENV || process.env.NODE_ENV || 'dev') as RequiredEnv | OptionalEnv;

  return Object.keys(cfgPart).reduce(
    (acc, val: keyof T) => {
      if (!acc.publicRuntimeConfig[cfgPartName] || !acc.serverRuntimeConfig[cfgPartName]) {
        throw new Error(
          'you\'re mistakenly try to transform configuration '
          + 'with key: ' + cfgPartName + ' that isn\'t in configuration\n'
          + 'please add ' + cfgPartName + ' to your default configuration',
        );
      }
      const configGroup = cfgPart[val][env] ? cfgPart[val][env]! : cfgPart[val].dev;

      if (configGroup.public) {
        Object.assign(acc.publicRuntimeConfig[cfgPartName], { [val]: configGroup });
      } else {
        Object.assign(acc.serverRuntimeConfig[cfgPartName], { [val]: configGroup });
      }

      return acc;
    },
    cfg as unknown as ICompiledConfiguration<TMakeCompiled<Fields>>,
  );
}
