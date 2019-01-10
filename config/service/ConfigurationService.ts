import { IConfig, IConfigFields } from '../types/IConfig';
import { IConfigurationAdapter } from './adapters';
import { merge } from 'lodash';

type TAdapterPriorities = 0 | 1 | 2 | 3 | 4 | 5;

interface IAdapterHandler {
  priority: TAdapterPriorities;
  adapter: IConfigurationAdapter;
}

/**
 * Service that expose access for application configuration, it could update configs from remote destination
 * by using connected adapters
 */
export class ConfigurationService implements IConfig<IConfigFields> {
  public _publicRuntimeConfig: IConfigFields;
  public _serverRuntimeConfig: IConfigFields;
  private adapters: IAdapterHandler[] = [];

  public constructor({ publicRuntimeConfig, serverRuntimeConfig }: IConfig<IConfigFields>) {
    this._serverRuntimeConfig = serverRuntimeConfig;
    this._publicRuntimeConfig = publicRuntimeConfig;
  }

  /**
   * Returns public configuration you can access it both on server and client.
   * @returns {IConfigFields}
   */
  public get publicRuntimeConfig(): IConfigFields {
    return this._publicRuntimeConfig;
  }

  /**
   * Returns private server configuration, you can access it only from server, on client it will return empty object
   * @returns {IConfigFields}
   */
  public get serverRuntimeConfig(): IConfigFields {
    return process.env.IS_SERVER ? this._serverRuntimeConfig : {} as IConfigFields;
  }

  /**
   * Register a new adapter, adapters used for fetching and retrieving configuration or a part of configuration;
   * @param {IConfigurationAdapter} adapter
   * @param {TAdapterPriorities} priority - adapter priority 0 is highest
   */
  public registerAdapter(adapter: IConfigurationAdapter, priority: TAdapterPriorities): void {
    this.adapters = this.adapters
      .concat([{ adapter, priority }])
      .sort((current, next) => current.priority < next.priority ? 1 : -1);
  }

  /**
   * Receive all data from the adapters sequent from lover priority to highest priority, higher priority adapters
   * erase configuration from lower priority adapters
   * @returns {Promise<void>}
   */
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
