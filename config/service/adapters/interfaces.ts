import { IConfigFields } from '../../types/IConfig';

export interface IConfigurationAdapter {
  get(): IConfigFields | Promise<IConfigFields> | undefined;
}
