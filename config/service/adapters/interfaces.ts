import { IConfig, IConfigFields } from '../../types/IConfig';

export interface IConfigurationAdapter {
  get(): IConfig<IConfigFields> | Promise<IConfig<IConfigFields>> | undefined;
}
