import { IConfig } from '../..';
import { IConfigFields } from '../../../../config/IConfig';

export interface IConfigurationAdapter {
  get(): IConfig<IConfigFields> | Promise<IConfig<IConfigFields>> | undefined;
}
