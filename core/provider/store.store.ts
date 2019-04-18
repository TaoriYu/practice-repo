import { interfaces } from 'inversify';
import { provideSingleton } from './provideSingleton';
import Newable = interfaces.Newable;
import Abstract = interfaces.Abstract;

export type TStoreName = string | Newable<{}> | Abstract<{}> | symbol;

interface IStoreHandler {
  name: TStoreName;
  constructor: IConstructable;
}

/**
 * Стор для хранения сторов.
 */
@provideSingleton(StoreStore)
export class StoreStore {
  private _stores: IStoreHandler[] = [];

  public get stores() {
    return this._stores;
  }

  public push<T>(name: TStoreName, constructor: IConstructable): void {
    this._stores.push({ name, constructor });
  }
}
