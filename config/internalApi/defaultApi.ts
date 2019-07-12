import { IApi } from '../config.interface';
import { IWithEnv } from '../../core/config';

export const defaultApi: IWithEnv<IApi> = {
  dev: {
    baseURL: 'https://api.unsplash.com',
    timeout: 2000,
    public: false,
  },
  production: {
    baseURL: 'https://api.unsplash.com',
    timeout: 2000,
    public: false,
  },
};
