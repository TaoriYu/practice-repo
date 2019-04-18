import { Container } from 'inversify';
import { container } from './container';
import { StoreStore } from './store.store';

export function createStoreContainer() {
  const storeContext = new Container();
  storeContext.parent = container;

  const storeStore = storeContext.get<StoreStore>(StoreStore);
  storeStore.stores.forEach(({ name, constructor }) => {
    storeContext.bind(name).to(constructor).inSingletonScope();
  });

  return storeContext;
}
