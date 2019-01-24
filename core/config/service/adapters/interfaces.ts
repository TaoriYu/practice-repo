import { IConfig } from '../..';
import { IConfigFields } from '../../../../config';

export interface IConfigurationAdapter {
  get(): IConfig<IConfigFields> | Promise<IConfig<IConfigFields>> | undefined;
}
