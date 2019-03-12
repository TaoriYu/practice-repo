import 'reflect-metadata';
import { injectable, postConstruct } from 'inversify';
import { ICompiledConfiguration, TCompiledConfigFields, TReturnConfigGroup } from '../types/internals';
import { IConfigurationAdapter } from './adapters';
import { merge } from 'ramda';

type TAdapterPriorities = 0 | 1 | 2 | 3 | 4 | 5;

interface IAdapterHandler {
  priority: TAdapterPriorities;
  adapter: IConfigurationAdapter;
}

/**
 * Service that expose access for application configuration, it could update configs from remote destination
 * by using connected adapters
 */
@injectable()
export class ConfigurationService<D extends TReturnConfigGroup<D>> implements ICompiledConfiguration<TCompiledConfigFields<D>> {
  private _publicRuntimeConfig: TCompiledConfigFields<D> = {} as TCompiledConfigFields<D>;
  private _serverRuntimeConfig: TCompiledConfigFields<D> = {} as TCompiledConfigFields<D>;
  private adapters: IAdapterHandler[] = [];

  @postConstruct()
  protected setConfigOnFirstLoad() {
    if (!process.env.IS_SERVER && typeof window !== 'undefined') {
      this._publicRuntimeConfig = window.__CONFIGURATION__;
    }
  }

  /**
   * Returns public configuration you can access it both on server and client.
   */
  public get publicRuntimeConfig(): TCompiledConfigFields<D> {
    return this._publicRuntimeConfig;
  }

  /**
   * Returns private server configuration, you can access it only from server, on client it will return empty object
   */
  public get serverRuntimeConfig(): TCompiledConfigFields<D> {
    return process.env.IS_SERVER ? this._serverRuntimeConfig : {} as TCompiledConfigFields<D>;
  }

  /**
   * Register a new adapter, adapters used for fetching and retrieving configuration or a part of configuration;
   */
  public registerAdapter(adapter: IConfigurationAdapter, priority: TAdapterPriorities): void {
    this.adapters = this.adapters
      .concat([{ adapter, priority }])
      .sort((current, next) => current.priority < next.priority ? 1 : -1);
  }

  /**
   * Receive all data from the adapters sequent from lover priority to highest priority, higher priority adapters
   * erase configuration from lower priority adapters
   */
  public async update() {
    let configurationToFill = this.getFullConfig();

    for (const { adapter } of this.adapters) {
      const result = await adapter.get();
      if (result) {
        configurationToFill = merge(configurationToFill, result);
      }
    }

    this._publicRuntimeConfig = configurationToFill.publicRuntimeConfig;
    this._serverRuntimeConfig = configurationToFill.serverRuntimeConfig;
  }

  private getFullConfig(): ICompiledConfiguration<TCompiledConfigFields<D>> {
    return Object.assign(
      {},
      {
        publicRuntimeConfig: this.publicRuntimeConfig,
        serverRuntimeConfig: this.serverRuntimeConfig,
      },
    );
  }
}
