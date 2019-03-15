import {
  IConfigGroup,
  IWithPublic,
  TReturnConfigGroup,
} from '../core/config';

export interface IConfigFields extends TReturnConfigGroup<IConfigFields> {
  externalApi: IConfigGroup<IApi>;
  internalApi: IConfigGroup<IApi>;
}

export interface IApi extends IWithPublic {
  baseURL: string;
  timeout?: number;
}
