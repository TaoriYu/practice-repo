import { ConfigurationService, RuntimeSettings } from '../..';
import { TestAdapter } from './testAdapter';

const runtime = new RuntimeSettings();
const cfg = new ConfigurationService();
const fakeConfig = {
  publicRuntimeConfig: { testConfig: { data: 'static data' } },
  serverRuntimeConfig: {},
};
const fakeConfig2 = {
  publicRuntimeConfig: { testConfigUploaded: { data: 'remote data' } },
  serverRuntimeConfig: {},
};
cfg.registerAdapter(new TestAdapter(fakeConfig), 5);
let dispose: (() => void) | undefined;

describe('runtime settings test suite', () => {
  beforeAll(() => {
    Object.assign(process.env, { IS_SERVER: 1 });
    runtime.service = cfg;
    jest.useFakeTimers();
  });

  test('runtime settings updates configuration', (end) => {
    expect(cfg.publicRuntimeConfig).toEqual({});
    runtime.enableRuntime().then((stopFn) => {
      dispose = stopFn;
      expect(cfg.publicRuntimeConfig).toEqual(fakeConfig.publicRuntimeConfig);
      cfg.registerAdapter(new TestAdapter(fakeConfig2), 4);
      jest.advanceTimersByTime(10000);
      jest.useRealTimers();
      setTimeout(() => {
        expect(cfg.publicRuntimeConfig).toMatchObject(fakeConfig2.publicRuntimeConfig);
        end();
      }, 100);
    }).catch(() => { /* test must failed here */ });
  });

  test('should throw error when enabled multiply times', async () => {
    await expect(runtime.enableRuntime())
      .rejects
      .toEqual(new Error('you trying to enable runtime settings that already enabled'));
  });

  test('dispose runtime settings', (end) => {
    jest.useFakeTimers();
    if (dispose) { dispose(); }
    const skippedCfg = {
      publicRuntimeConfig: { skipped: { data: 'skipped' } },
      serverRuntimeConfig: {},
    };
    cfg.registerAdapter(new TestAdapter(skippedCfg), 4);
    jest.advanceTimersByTime(11000);
    jest.useRealTimers();
    setTimeout(() => {
      expect(cfg.publicRuntimeConfig).not.toMatchObject(skippedCfg.publicRuntimeConfig);
      end();
    }, 100);
  });
});
