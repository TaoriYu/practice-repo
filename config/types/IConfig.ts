import { IConfigGroup, IWithPublic, TMakeCompiled, TReturnCompiledConfigGroup, TReturnConfigGroup } from './internals';

export interface IConfig<Fields extends TReturnConfigGroup<Fields>> {
  serverRuntimeConfig: Fields;
  publicRuntimeConfig: Fields;
}

export interface ICompiledConfiguration<Fields extends TReturnCompiledConfigGroup<Fields>> {
  serverRuntimeConfig: Fields;
  publicRuntimeConfig: Fields;
}

export interface IConfigFields extends TReturnConfigGroup<IConfigFields> {
  apis: IConfigGroup<IApi>;
}

export type TCompiledConfigFields = TMakeCompiled<IConfigFields>;

export interface IApi extends IWithPublic {
  baseURL: string;
  timeout?: number;
}
