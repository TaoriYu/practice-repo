import { Container } from 'inversify';
import { LocalAdapter } from '../../config/service/adapters/LocalAdapter';
import { ConfigurationService } from '../../config/service/ConfigurationService';

export const container = new Container();

container.bind(ConfigurationService).toSelf().inSingletonScope().onActivation((context, service) => {
  service.registerAdapter(new LocalAdapter(), 0);

  return service;
});
