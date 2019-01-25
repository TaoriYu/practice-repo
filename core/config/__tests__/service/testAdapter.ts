import { IConfig } from '../..';
import { IConfigurationAdapter } from '../../service/adapters';

// tslint:disable-next-line:no-any
type MockedConfig = IConfig<any>;

export class TestAdapter implements IConfigurationAdapter {
  private readonly mockConfiguration: MockedConfig;

  public constructor(mockConfiguration: MockedConfig) {
    this.mockConfiguration = mockConfiguration;
  }

  public get(): MockedConfig | Promise<MockedConfig> | undefined {
    return this.mockConfiguration;
  }
}

describe('test adapter utils suite', () => {
  test('return data passed to constructor', () => {
    const data = {
      publicRuntimeConfig: {},
      serverRuntimeConfig: {},
    } as MockedConfig;
    const testAdapter = new TestAdapter(data);
    expect(testAdapter.get()).toBe(data);
  });
});
