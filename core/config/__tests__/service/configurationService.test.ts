import { ConfigurationService, IConfig } from '../..';
import { AdapterMock } from './adapter.mock';
import { fullConfigMock, privateConfigMock, publicConfigMock } from './config.mock';

const testConfig: IConfig<{}> = fullConfigMock();

describe('configuration service test suite', () => {
  beforeAll(async () => {
    Object.assign(process.env, { IS_SERVER: '1' });
  });

  test('should return private configuration on server', async () => {
    const service = new ConfigurationService();
    service.registerAdapter(new AdapterMock(testConfig), 5);
    await service.update();
    expect(service.serverRuntimeConfig).toEqual(testConfig.serverRuntimeConfig);
  });

  test('should register adapters and update based on priority', async () => {
    const service = new ConfigurationService();
    const configurationToMerge1 = publicConfigMock();
    const configurationToMerge2 = publicConfigMock();
    const configurationToMerge3 = privateConfigMock();

    service.registerAdapter(new AdapterMock(configurationToMerge1), 4);
    await service.update();

    expect(service.publicRuntimeConfig).toMatchObject(configurationToMerge1.publicRuntimeConfig);

    service.registerAdapter(new AdapterMock(configurationToMerge2), 3);
    await service.update();

    expect(service.publicRuntimeConfig).toMatchObject(configurationToMerge2.publicRuntimeConfig);

    service.registerAdapter(new AdapterMock(configurationToMerge3), 5);
    await service.update();

    expect(service.publicRuntimeConfig).toMatchObject(configurationToMerge2.publicRuntimeConfig);
    expect(service.serverRuntimeConfig).toMatchObject(configurationToMerge3.serverRuntimeConfig);
  });

  test('should ignore broken adapters', async () => {
    const service = new ConfigurationService();
    service.registerAdapter({
      get(): undefined {
        return;
      },
    }, 1);
    service.registerAdapter(new AdapterMock(testConfig), 5);
    await service.update();
    expect(service.publicRuntimeConfig).toMatchObject(testConfig.publicRuntimeConfig);
  });
});
