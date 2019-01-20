/**
 * @jest-environment jsdom
 */
import { ConfigurationService, IConfig } from '../..';
import { container } from '../../../provider/container';

const testConfig: IConfig<any> = {
  publicRuntimeConfig: {
    testPublic: {
      numberData: 1000,
      stringData: 'string',
      public: true,
    }
  },
  serverRuntimeConfig: {
    testPrivate: {
      numberData: 677,
      stringData: 'another string data',
      public: false,
    }
  }
};

container.bind(ConfigurationService).toSelf().inSingletonScope();
const getService = () => container.get<ConfigurationService<any>>(ConfigurationService);

describe('configuration service test suite', () => {
  test('should load default configuration in browser', () => {
    window.__CONFIGURATION__ = testConfig.publicRuntimeConfig;
    const service = getService();
    expect(service.publicRuntimeConfig).toEqual(testConfig.publicRuntimeConfig);
  });

  test('should return public configuration', () => {
    const service = getService();
    expect(service.publicRuntimeConfig).toEqual(testConfig.publicRuntimeConfig);
  });

  test('should return empty object on server', () => {
    const service = getService();
    expect(service.serverRuntimeConfig).toEqual({});
  });
});
