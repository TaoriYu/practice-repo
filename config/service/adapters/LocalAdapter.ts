import { appConfig } from '../../config';
import { IConfig, IConfigFields } from '../../types/IConfig';
import { IConfigurationAdapter } from './interfaces';

export class LocalAdapter implements IConfigurationAdapter {
  public get(): IConfig<IConfigFields> | Promise<IConfig<IConfigFields>> | undefined {
    return appConfig;
  }
}
