import { random } from '../../../utils/fn';
import { log } from '../../logger';
import { provideSingleton } from '../../provider';
import { ConfigurationService } from './configurationService';
const isDev = process.env.NODE_ENV === 'development';

@provideSingleton(RuntimeSettings)
export class RuntimeSettings {
  public isRuntimeEnabled = isDev ? false : global.isRuntimeEnabled;
  public service: ConfigurationService<{}> = new ConfigurationService();
  private mutex = false;
  /* for preventing instance duplicating */
  private uniqueServiceId = random(1000, 10000);
  private log = log(`RuntimeSettings_${this.uniqueServiceId}`);

  public async enableRuntime() {
    if (!process.env.IS_SERVER) { return undefined; }
    this.check();
    this.log.info('runtime enabled %d', this.uniqueServiceId);
    await this.service.update();
    this.log.debug('first initial update finished');

    return isDev ? () => ({}) : this.runtimeSettings();
  }

  private check() {
    if (this.isRuntimeEnabled) {
      throw new Error('you trying to enable runtime settings that already enabled');
    }
    global.isRuntimeEnabled = true;
    this.isRuntimeEnabled = true;
  }

  private async runtimeSettings() {
    const intervalId = setInterval(
      async () => {
        if (!this.mutex) {
          this.mutex = true;
          await this.updateService();
          this.mutex = false;
        } else {
          this.log.warn(`cannot update configs because previous update cycle is'not finished`);
        }
      },
      10000,
    );

    return () => clearInterval(intervalId);
  }

  private async updateService() {
    this.log.debug('start update on all adapters');
    try {
      await this.service.update();
      this.log.debug('all adapters successfully finished');
    } catch (e) {
      this.log.error(
        'Runtime settings throw error while executing updates\n' +
        `Message: ${e.message}\n` +
        'stack: %O\n', e.stack,
      );
    }
  }
}
