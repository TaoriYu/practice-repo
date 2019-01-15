import * as apis from './api';
import { IConfig, IConfigFields } from './types/IConfig';
import { composeTransformations } from './utils/composeTransformations';

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
