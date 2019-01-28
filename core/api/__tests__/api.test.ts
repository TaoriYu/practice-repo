import { axiosMockFactory } from '../../../utils/tests';
import { Api } from '../api';

describe('Api class suite', () => {

  test('should produce instance without errors', () => {
    expect(() => new Api(axiosMockFactory({}))).not.toThrow();
  });

  test('should save initial instance without changes', () => {
    const mockInstance = axiosMockFactory({});
    const api = new Api(mockInstance);
    expect(api.api).toBe(mockInstance);
  });

  test('should save interceptors on axios adapter', () => {
    const mockInstance = axiosMockFactory({});
    const requestSpy = jest.spyOn(mockInstance.interceptors.response, 'use');
    const responseSpy = jest.spyOn(mockInstance.interceptors.request, 'use');

    expect(new Api(mockInstance)).toBeDefined();
    expect(requestSpy).toBeCalled();
    expect(responseSpy).toBeCalled();
  });

  test('run should return response data', async () => {
    const api = new Api(axiosMockFactory({
      data: 'data',
      status: 200,
      statusText: 'OK',
      headers: [],
    }));
    await expect(api.run({})).resolves.toMatchObject({
      data: 'data',
      status: 200,
      statusText: 'OK',
      headers: [],
    });
  });

  test('run should throw exception on error request', async () => {
    const api = new Api(axiosMockFactory({}, false));
    await expect(api.run({})).rejects.toBeDefined();
  });
});
