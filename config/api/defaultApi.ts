import { IApi } from '../config.interface';
import { IWithEnv } from '../../core/config';

export const defaultApi: IWithEnv<IApi> = {
  dev: {
    baseURL: 'http://api.github.com',
    timeout: 2000,
    public: true,
  },
  production: {
    baseURL: 'https://api.github.com',
    timeout: 2000,
    public: true,
  },
};
