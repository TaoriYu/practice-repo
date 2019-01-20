import { ConfigurationService, IConfig } from '../..';
import { container } from '../../../provider/container';
import { TestAdapter } from './testAdapter';

const testConfig: IConfig<any> = {
  publicRuntimeConfig: {
    testPublic: {
      numberData: 1000,
      stringData: 'string',
      public: true,
    },
  },
  serverRuntimeConfig: {
    testPrivate: {
      numberData: 677,
      stringData: 'another string data',
      public: false,
    },
  },
};

container.bind(ConfigurationService).toSelf().inSingletonScope();
const getService = () => container.get<ConfigurationService<any>>(ConfigurationService);

describe('configuration service test suite', () => {
  beforeAll(async () => {
    Object.assign(process.env, { IS_SERVER: '1' });
    const service = getService();
    service.registerAdapter(new TestAdapter(testConfig), 5);
    await service.update();
  });

  test('should return private configuration on server', () => {
    const service = getService();
    service.registerAdapter(new TestAdapter(testConfig), 5);
    expect(service.serverRuntimeConfig).toEqual(testConfig.serverRuntimeConfig);
  });

  test('should register adapters and update based on priority', async () => {
    expect.assertions(3);
    const service = getService();
    const configurationToMerge1 = {
      publicRuntimeConfig: { testMerged1: { data: 'string', public: true } },
      serverRuntimeConfig: {},
    };
    const configurationToMerge2 = {
      publicRuntimeConfig: { testMerged1: { data: 'changed string', number: 100, public: true } },
      serverRuntimeConfig: {},
    };
    const configurationToMerge3 = {
      publicRuntimeConfig: { testMerged1: { data: 'never returned data', number: 2, public: true } },
      serverRuntimeConfig: {},
    };
    service.registerAdapter(new TestAdapter(configurationToMerge1), 4);
    await service.update();

    expect(service.publicRuntimeConfig).toMatchObject(configurationToMerge1.publicRuntimeConfig);

    service.registerAdapter(new TestAdapter(configurationToMerge2), 3);
    await service.update();

    expect(service.publicRuntimeConfig).toMatchObject(configurationToMerge2.publicRuntimeConfig);

    service.registerAdapter(new TestAdapter(configurationToMerge3), 5);
    await service.update();

    expect(service.publicRuntimeConfig).toMatchObject(configurationToMerge2.publicRuntimeConfig);
  });
});
