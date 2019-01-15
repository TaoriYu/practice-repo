import { AxiosResponse } from 'axios';
import { axiosMockFactory } from '../../../utils/tests';
import { Api } from '../api';

class ApiExample extends Api {
  constructor(data?: any) {
    super(data);
  }

  public getFakeData() {
    return this.api.get('data');
  }
}

const mockInstance = axiosMockFactory(
  (config) =>
    Promise.resolve<AxiosResponse>({ config, data: 'data', headers: [], status: 200, statusText: 'OK' }),
);

describe('Api class suite', () => {

  test('should produce instance without errors', () => {
    expect(() => new ApiExample(mockInstance)).not.toThrow();
  });

  test('should return data after request', async () => {
    expect.assertions(1);
    const api = new ApiExample(mockInstance);
    await expect(api.getFakeData()).resolves.toMatchObject({
      data: 'data',
      status: 200,
      statusText: 'OK',
      headers: [],
    });
  });
});
