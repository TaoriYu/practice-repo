import { IConfig, IConfigFields } from '../types/IConfig';
import { IConfigurationAdapter } from './adapters';
import { merge } from 'lodash';

type TAdapterPriorities = 0 | 1 | 2 | 3 | 4 | 5;

interface IAdapterHandler {
  priority: TAdapterPriorities;
  adapter: IConfigurationAdapter;
}

export class ConfigurationService implements IConfig<IConfigFields> {
  public _publicRuntimeConfig: IConfigFields;
  public _serverRuntimeConfig: IConfigFields;
  private adapters: IAdapterHandler[] = [];

  public constructor({ publicRuntimeConfig, serverRuntimeConfig }: IConfig<IConfigFields>) {
    this._serverRuntimeConfig = serverRuntimeConfig;
    this._publicRuntimeConfig = publicRuntimeConfig;
  }

  public get publicRuntimeConfig(): IConfigFields {
    return this._publicRuntimeConfig;
  }

  public get serverRuntimeConfig(): IConfigFields {
    return process.env.IS_SERVER ? this._serverRuntimeConfig : {} as IConfigFields;
  }

  public registerAdapter(adapter: IConfigurationAdapter, priority: TAdapterPriorities): void {
    this.adapters = this.adapters
      .concat([{ adapter, priority }])
      .sort((current, next) => current.priority < next.priority ? 1 : -1);
  }

  public async update() {
    const configurationToFill = this.getFullConfig();

    for (const key in this.adapters) if (key in this.adapters) {
      const result = await this.adapters[key].adapter.get();
      if (result) {
        merge(configurationToFill, result);
      }
    }
  }

  private getFullConfig(): IConfig<IConfigFields> {
    return Object.assign(
      {},
      {
        publicRuntimeConfig: this.publicRuntimeConfig,
        serverRuntimeConfig: this.serverRuntimeConfig
      }
    );
  }
}
