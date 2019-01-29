import { injectable } from 'inversify';
import { ConfigurationService } from '../core/config';
import { IConfigFields } from './config.interface';

@injectable()
export class AppConfigurationService extends ConfigurationService<IConfigFields> {
}
