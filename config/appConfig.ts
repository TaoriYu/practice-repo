import * as externalApi from './externalApi';
import * as internalApi from './internalApi';
import { IConfig, composeTransformations } from '../core/config';
import { IConfigFields } from './config.interface';

const defaultConfig: IConfig<IConfigFields> = {
  publicRuntimeConfig: {
    internalApi: {},
    externalApi: {},
  },
  serverRuntimeConfig: {
    internalApi: {},
    externalApi: {},
  },
};

export const appConfig = composeTransformations(
  defaultConfig,
  [externalApi, 'externalApi'],
  [internalApi, 'internalApi'],
);
