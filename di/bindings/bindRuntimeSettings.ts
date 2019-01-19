import { Container } from 'inversify';
import { AppConfigurationService } from '../../config';
import { RuntimeSettings } from '../../core/config';

export function bindRuntimeSettings(container: Container) {
  const runtimeSettings = container.get(RuntimeSettings);
  const config = container.get(AppConfigurationService);
  runtimeSettings.service = config;
}
