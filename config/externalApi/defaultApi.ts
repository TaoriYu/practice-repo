import { IApi } from '../config.interface';
import { IWithEnv } from '../../core/config';

export const defaultApi: IWithEnv<IApi> = {
  dev: {
    baseURL: 'http://localhost:3000/api',
    timeout: 2000,
    public: true,
  },
  production: {
    baseURL: 'http://localhost:3000/api',
    timeout: 2000,
    public: true,
  },
};
