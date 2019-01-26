import { IConfig } from '../..';
import { IConfigurationAdapter } from '../../service/adapters';

// tslint:disable-next-line:no-any
type MockedConfig = IConfig<any>;

export class AdapterMock implements IConfigurationAdapter {
  private readonly mockConfiguration: MockedConfig;

  public constructor(mockConfiguration: MockedConfig) {
    this.mockConfiguration = mockConfiguration;
  }

  public get(): MockedConfig | Promise<MockedConfig> | undefined {
    return this.mockConfiguration;
  }
}
