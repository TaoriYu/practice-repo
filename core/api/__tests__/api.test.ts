import { axiosMockFactory } from '../../../utils/tests';
import { Api } from '../api';

class ApiExample extends Api<{}> {
  constructor(data?: any) {
    super(data);
  }

  public getFakeData() {
    return this.api.get('data');
  }

  public requestData() {
    return this.run({});
  }
}

describe('Api class suite', () => {

  test('should produce instance without errors', () => {
    expect(() => new ApiExample(axiosMockFactory({}))).not.toThrow();
  });

  test('should return data after request', async () => {
    expect.assertions(1);
    const api = new ApiExample(axiosMockFactory({
      data: 'data',
      status: 200,
      statusText: 'OK',
      headers: []
    }));
    await expect(api.getFakeData()).resolves.toMatchObject({
      data: 'data',
      status: 200,
      statusText: 'OK',
      headers: [],
    });
  });

  test('should return data run bootstrapped request', async () => {
    expect.assertions(1);
    const api = new ApiExample(axiosMockFactory({
      data: 'data',
      status: 200,
      statusText: 'OK',
      headers: []
    }));
    await expect(api.requestData()).resolves.toMatchObject({
      data: 'data',
      status: 200,
      statusText: 'OK',
      headers: [],
    });
  });
});
