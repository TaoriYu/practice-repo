/* tslint:disable:max-classes-per-file */
import { container } from '../container';
import { makeStore } from '../makeStore';
import { StoreStore } from '../store.store';

describe('make store test suite', () => {
  test('should bind class in singleton scope', () => {
    @makeStore(Store)
    class Store { public property = false; }
    const storeStore = container.get(StoreStore);
    expect(storeStore.stores[0]).toEqual({ name: Store, constructor: Store });
  });
});
