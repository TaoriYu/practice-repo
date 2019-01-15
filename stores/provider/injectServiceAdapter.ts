import { ConfigurationService } from '../../config/service/ConfigurationService';
import { container } from './container';
import debug from 'debug';

const debuger = debug('RuntimeSettings');

export async function enableRuntime() {
  const service = container.get(ConfigurationService);
  await service.update();

  return runtimeSettings(service);
}

export function runtimeSettings(service: ConfigurationService) {
  let muted = false;
  const intervalId = setInterval(
    () => {
      if (!muted) {
        debuger('start update on all adapters');
        service.update().then(() => {
          debuger('update finished');
          muted = true;
        });
      } else {
        debuger(`cannot update configs because previous update cycle is'not ended`);
      }
    },
    10000,
  );

  return () => clearInterval(intervalId);
}
