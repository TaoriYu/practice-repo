import { ConfigurationService } from '../../core/config';
import { AppConfigurationService } from '../appConfigurationService';

describe('appConfigurationService test suite', () => {
  test('should create specific instance of configuration service', () => {
    const service = new AppConfigurationService();
    expect(service).toBeInstanceOf(ConfigurationService);
  });
});
