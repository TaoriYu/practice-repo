import { IConfig } from '../../core/config';
import { IConfigurationAdapter } from '../../core/config/service/adapters';
import { IConfigFields } from '../IConfig';

/**
 * Simple, mostly example adapter that might return constant data;
 */
export class LocalAdapter implements IConfigurationAdapter {
  public get(): IConfig<IConfigFields> | Promise<IConfig<IConfigFields>> | undefined {
    if (process.env.IS_SERVER || process.env.NODE_ENV === 'test') {
      // tslint:disable-next-line:no-require-imports
      return require('../../config').appConfig;
    }

    return;
  }
}
