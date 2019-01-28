import { appConfig as appConfiguration } from '../../appConfig';
import { LocalAdapter } from '../localAdapter';

describe('local adapter test suite', () => {
  test('should return appConfiguration on server', () => {
    const adapter = new LocalAdapter();
    expect(adapter.get()).toEqual(appConfiguration);
  });

  test('should not return appConfiguration on client', () => {
    process.env.NODE_ENV = 'browser';
    process.env.IS_SERVER = '';
    const adapter = new LocalAdapter();
    expect(adapter.get()).toBeUndefined();
  });
});
