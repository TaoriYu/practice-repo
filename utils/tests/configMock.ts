import { AxiosRequestConfig } from 'axios';
import { LocalAdapter } from '../../config/adapters/LocalAdapter';
import { AppConfigurationService } from '../../config';
import { container } from '../../core/provider/container';

const configService = container.get(AppConfigurationService);
configService.registerAdapter(new LocalAdapter(), 0);
configService.update();

jest.mock('../../config/config.ts', () => {
  return ({
    appConfig: {
      publicRuntimeConfig: {
        apis: {
          defaultApi: {
            baseURL: 'http://test.url/',
            timeout: 200,
            public: true,
            adapter: (config: AxiosRequestConfig) => Promise.resolve({
              data: 'data',
              status: 200,
              statusText: 'OK',
              headers: [],
              config,
            }),
          },
        },
      },
      serverRuntimeConfig: {},
    }
  });
});
