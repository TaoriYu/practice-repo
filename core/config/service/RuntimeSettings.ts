import { provideSingleton } from '../../provider';
import debug from 'debug';
import { ConfigurationService } from './ConfigurationService';

@provideSingleton(RuntimeSettings)
export class RuntimeSettings {
  public isRuntimeEnabled = false;
  public service: ConfigurationService<{}> = new ConfigurationService();
  private log = debug('RuntimeSettings');
  private mutex = false;

  public async enableRuntime() {
    if (!process.env.IS_SERVER) { return; }
    this.check();
    this.log('runtime enabled');
    await this.service.update();
    this.log('first initial update finished');

    return this.runtimeSettings();
  }

  private check() {
    if (this.isRuntimeEnabled) {
      throw new Error('you trying to enable runtime settings that already enabled');
    }
    this.isRuntimeEnabled = true;
  }

  private async runtimeSettings() {
    const intervalId = setInterval(
      async () => {
        if (!this.mutex) {
          this.mutex = true;
          await this.updateService();
        } else {
          this.log(`cannot update configs because previous update cycle is'not finished`);
        }
      },
      10000,
    );

    return () => clearInterval(intervalId);
  }

  private async updateService() {
    this.log('start update on all adapters');
    await this.service.update();
    this.log('update finished');
    this.mutex = false;
  }
}
