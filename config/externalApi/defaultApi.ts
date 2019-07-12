import { IApi } from '../config.interface';
import { IWithEnv } from '../../core/config';

export const defaultApi: IWithEnv<IApi> = {
  dev: {
    baseURL: '/api',
    timeout: 2000,
    public: true,
  },
  production: {
    baseURL: '/api',
    timeout: 2000,
    public: true,
  },
};
