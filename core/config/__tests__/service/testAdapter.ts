import { IConfig } from '../..';
import { IConfigurationAdapter } from '../../service/adapters';

export class TestAdapter implements IConfigurationAdapter {
  private readonly mockConfiguration: IConfig<any>;

  public constructor(mockConfiguration: IConfig<any>) {
    this.mockConfiguration = mockConfiguration;
  }

  public get(): IConfig<any> | Promise<IConfig<any>> | undefined {
    return this.mockConfiguration;
  }
}

describe('test adapter utils suite', () => {
  test('return data passed to constructor', () => {
    const data = {
      publicRuntimeConfig: {},
      serverRuntimeConfig: {}
    };
    const testAdapter = new TestAdapter(data);
    expect(testAdapter.get()).toBe(data);
  });
});
