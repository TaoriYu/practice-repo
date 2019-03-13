import { AxiosRequestConfig } from 'axios';

export type TRunConfiguration =
  OmitKeys<AxiosRequestConfig, 'transformResponse' | 'adapter' | 'method' | 'baseURL'>;

export interface IExtendedAxiosRequestConfig extends AxiosRequestConfig {
  requestStartAt: Date;
  requestUniqueId: number;
}

export enum EApiState {
  /** выполняется */
  pending = 'pending',
  /** завершилась успешно */
  fulfilled = 'fulfilled',
  /** завершилась с ошибкой */
  rejected = 'rejected',
  /** ниразу не вызывалась */
  idle = 'idle',
}

export enum EApiErrorTypes {
  response = 'Response',
  request = 'Request',
  unrecognized = 'Unrecognised',
}
