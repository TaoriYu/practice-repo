import { appConfig } from '../../config';
import { IConfig, IConfigFields } from '../../types/IConfig';
import { IConfigurationAdapter } from './interfaces';

/**
 * Simple, mostly example adapter that might return constant data;
 */
export class LocalAdapter implements IConfigurationAdapter {
  public get(): IConfig<IConfigFields> | Promise<IConfig<IConfigFields>> | undefined {
    return appConfig;
  }
}
