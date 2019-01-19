import { Container } from 'inversify';
import { LocalAdapter } from '../../config/adapters/LocalAdapter';
import { AppConfigurationService } from '../../config';

export function bindConfigurationService(container: Container) {
  container.bind(AppConfigurationService).toSelf().inSingletonScope().onActivation((context, service) => {
    service.registerAdapter(new LocalAdapter(), 0);

    return service;
  });
}
