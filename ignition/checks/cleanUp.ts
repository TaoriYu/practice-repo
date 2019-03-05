import { NextContext } from 'next';
import { container } from '../../core/provider/container';
import { StoreStore } from '../../core/provider/store.store';
import { ICheck } from '../interfaces';

/**
 * Clear stores data must be first check in ignition
 */
export class CleanUp implements ICheck {

  public constructor(
    private storeStore: StoreStore,
  ) {}

  public clientSide(derivedData: any): void {
    //
  }

  public async serverSide(ctx: NextContext): Promise<object> {
    this.storeStore.stores.forEach(({ name, constructor }) => {
      container.rebind(name).to(constructor);
    });

    return {};
  }

}
