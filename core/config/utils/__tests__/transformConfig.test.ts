import { IApi } from '../../../../config';
import { IConfig, IConfigGroup } from '../../types/internals';
import { transform } from '../transformConfig';

describe('configuration transform testing', () => {
  // tslint:disable-next-line:no-any
  let defaultConfig: IConfig<any> = {
    serverRuntimeConfig: {},
    publicRuntimeConfig: {},
  };

  beforeEach(() => {
    defaultConfig = {
      publicRuntimeConfig: {
        apis: {},
      },
      serverRuntimeConfig: {
        apis: {},
      },
    };
  });

  test('should place public members into publicRuntimeConfig', () => {
    const fakeApiConfigFields: IConfigGroup<IApi> = {
      testOne: {
        dev: { baseURL: 'test', timeout: 0, public: true },
        production: { baseURL: 'test', timeout: 0, public: true },
      },
      testTwo: {
        dev: { baseURL: 'testTwo', timeout: 20, public: false },
        production: { baseURL: 'test', timeout: 0, public: true },
      },
    };

    expect(transform(defaultConfig, fakeApiConfigFields, 'apis')).toEqual({
      publicRuntimeConfig: {
        apis: {
          testOne: { baseURL: 'test', timeout: 0, public: true },
        },
      },
      serverRuntimeConfig: {
        apis: {
          testTwo: { baseURL: 'testTwo', timeout: 20, public: false },
        },
      },
    });
  });
});
