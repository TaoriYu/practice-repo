export interface IConfig<Fields extends TReturnConfigGroup<Fields>> {
  serverRuntimeConfig: Fields;
  publicRuntimeConfig: Fields;
}

export interface ICompiledConfiguration<Fields extends TReturnCompiledConfigGroup<Fields>> {
  serverRuntimeConfig: Fields;
  publicRuntimeConfig: Fields;
}

export type TCompiledConfigFields<D extends TReturnConfigGroup<D>> = TMakeCompiled<D>;

export interface IConfigGroup<T extends IWithPublic = IWithPublic> {
  [N: string]: IWithEnv<T>;
}

export interface ICompiledConfigGroup<T extends IWithPublic = IWithPublic> {
  [N: string]: T;
}

export interface IWithPublic {
  public: boolean;
}

export type RequiredEnv = 'dev' | 'production';

export type OptionalEnv = 'stage' | 'test';

export type IWithEnv<T extends IWithPublic = IWithPublic> = IWithRequiredEnv<T> & IWithOptionalEnv<T>;

export type IWithOptionalEnv<T extends IWithPublic = IWithPublic> = {
  [Key in OptionalEnv]?: T;
};

export type IWithRequiredEnv<T extends IWithPublic = IWithPublic> = {
  [Key in RequiredEnv]: T;
};

export type TMappedFields<T, E> = { [N in keyof T]: E };

export type TReturnConfigGroup<T = unknown> = TMappedFields<T, IConfigGroup>;
export type TReturnCompiledConfigGroup<T = unknown> = TMappedFields<T, ICompiledConfigGroup>;

export type TMakeCompiled<T extends TReturnConfigGroup<T>> = {
  [N in keyof T]: T[N] extends IConfigGroup<infer E> ? ICompiledConfigGroup<E> : T[N];
};
