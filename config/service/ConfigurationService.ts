import { IConfig, IConfigFields } from '../types/IConfig';
import { IConfigurationAdapter } from './adapters';

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

  private fetch() {
    const adaptersIterator = this.iterate(this.adapters);
    const move = () => {
      const next = adaptersIterator.next();
      if (!next.done) {
        const { value: { adapter, priority } } = next;
        const result = adapter.get();
        if (result instanceof Promise) {
          result.then((config) => {
            if (config)
          }).catch();
        }
        move();
      }
    };
  }

  private iterate = function*<T>(array: T[]) {
    let i = 0;
    while (i < array.length) yield array[i++];
  };
}
