import { mocked } from 'ts-jest/utils';
import { RuntimeSettings } from '../../service/runtimeSettings';
import { ConfigurationService } from '../../service/configurationService';

jest.mock('../../service/configurationService');

describe('runtime settings test suite', () => {
  beforeEach(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
    Object.assign(process.env, { IS_SERVER: 1 });
  });

  test('runtime settings trigger updates every 10 seconds', async () => {
    const runtime = new RuntimeSettings();
    runtime.service = new ConfigurationService();
    expect(runtime.isRuntimeEnabled).toBeFalsy();
    expect(await runtime.enableRuntime()).toBeDefined();
    expect(runtime.service.update).toBeCalledTimes(1);
    jest.advanceTimersByTime(10000);
    expect(runtime.service.update).toBeCalledTimes(2);
  });

  test('should dispose runtime after enabling', async () => {
    const runtime = new RuntimeSettings();
    const cfgSrv = new ConfigurationService();
    runtime.service = cfgSrv;
    expect(runtime.isRuntimeEnabled).toBeFalsy();
    const dispose = await runtime.enableRuntime();
    expect(dispose).toBeDefined();
    expect(runtime.isRuntimeEnabled).toBeTruthy();
    jest.advanceTimersByTime(10000);
    // first time it was called after enabling
    expect(cfgSrv.update).toBeCalledTimes(2);
    mocked(cfgSrv.update).mockClear();
    dispose!();
    jest.advanceTimersByTime(10000);
    expect(cfgSrv.update).not.toBeCalled();
  });

  test('should throw error when enabled multiply times', async () => {
    const runtime = new RuntimeSettings();
    await runtime.enableRuntime();
    await expect(runtime.enableRuntime())
      .rejects
      .toEqual(new Error('you trying to enable runtime settings that already enabled'));
  });

  test('should not enable runtime on the client', async () => {
    delete process.env.IS_SERVER;
    const runtime = new RuntimeSettings();
    expect(await runtime.enableRuntime()).toBeUndefined();
    expect(runtime.isRuntimeEnabled).toBeFalsy();
  });

  test('should not calling update if previous cycle not finished', async () => {
    const runtime = new RuntimeSettings();
    const cfgSrv = new ConfigurationService();
    runtime.service = cfgSrv;
    await runtime.enableRuntime();
    mocked(cfgSrv.update).mockImplementation(() =>
      new Promise((resolve) => setTimeout(resolve, 20000)),
    );
    expect(cfgSrv.update).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(10000);
    expect(cfgSrv.update).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(10000);
    expect(cfgSrv.update).toHaveBeenCalledTimes(2);
  });

  test('should catch exception in service update', async () => {
    const runtime = new RuntimeSettings();
    const cfgSrv = new ConfigurationService();
    runtime.service = cfgSrv;
    // @ts-ignore
    const logSpy = jest.spyOn(runtime.log, 'error');
    await runtime.enableRuntime();
    mocked(cfgSrv.update).mockImplementation(() => { throw new Error('ouch'); });
    jest.advanceTimersByTime(10000);
    expect(logSpy.mock.calls[0][0]).toMatch('ouch');
  });
});
