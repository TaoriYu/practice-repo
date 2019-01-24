import { ICompiledConfiguration, IConfig, TMakeCompiled, TReturnConfigGroup } from '../types/internals';
import { transform } from './transformConfig';

/**
 * Композиция из функций трансформации, для большей наглядности
 * @see transform
 * @example
 * export * as apis from './api';
 * export const appConfig: IConfig = composeTransformations(
 *  defaultConfig,
 *  [apis, 'apis'],
 *  [env, 'env'],
 * );
 */
export function composeTransformations<Fields extends TReturnConfigGroup<Fields>, T extends keyof Fields>(
  // tslint:disable-next-line:trailing-comma
  initialConfig: IConfig<Fields>, ...rest: Array<[Fields[T], T]>
): ICompiledConfiguration<TMakeCompiled<Fields>> {
  // set any cause of typecasting. We're mutate initialConfig object, because ot's much faster to implement
  return rest.reduce(
    (acc, [obj, key]) => (transform(acc, obj, key as keyof Fields)),
    // tslint:disable-next-line:no-any
    initialConfig as any,
  );
}
