import { injectable } from 'inversify';
import { ConfigurationService } from '../core/config';
import { IConfigFields } from './IConfig';

@injectable()
export class AppConfigurationService extends ConfigurationService<IConfigFields> {
}
