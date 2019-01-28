import {
  IConfigGroup,
  IWithPublic,
  TReturnConfigGroup,
} from '../core/config';

export interface IConfigFields extends TReturnConfigGroup<IConfigFields> {
  apis: IConfigGroup<IApi>;
}

export interface IApi extends IWithPublic {
  baseURL: string;
  timeout?: number;
}
