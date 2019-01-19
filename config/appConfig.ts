import * as apis from './api';
import { IConfig, composeTransformations } from '../core/config';
import { IConfigFields } from './IConfig';

const defaultConfig: IConfig<IConfigFields> = {
  publicRuntimeConfig: {
    apis: {},
  },
  serverRuntimeConfig: {
    apis: {},
  },
};

export const appConfig = composeTransformations(
  defaultConfig,
  [apis, 'apis'],
);
