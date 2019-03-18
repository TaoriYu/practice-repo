import { NextContext } from 'next';
import { provide } from '../../core/provider';
import { StoreStore } from '../../core/provider/store.store';
import { container } from '../../di/container';
import { ICheck } from '../../core/ignition';

/**
 * Clear stores data must be first check in ignition
 */
@provide(CleanUp)
export class CleanUp implements ICheck {

  public constructor(
    private storeStore: StoreStore,
  ) {}

  public clientSide(derivedData: any): void {
    //
  }

  public async serverSide(ctx: NextContext): Promise<object> {
    this.storeStore.stores.forEach(({ name, constructor }) => {
      container.rebind(name).to(constructor).inSingletonScope();
    });

    return {};
  }

}
