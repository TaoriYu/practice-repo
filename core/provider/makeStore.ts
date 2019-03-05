import { injectable, interfaces } from 'inversify';
import { container } from './container';
import { StoreStore } from './store.store';
import Newable = interfaces.Newable;
import Abstract = interfaces.Abstract;

type TStoreName = string | Newable<{}> | Abstract<{}> | symbol;

/**
 * Декоратор, регистрирует класс как store в DI.
 * 1) store - синглтон;
 * 2) Каждый стор очищается когда приходит новый запрос
 * 3) store - регистрируется в специальном Store для хранения Stores
 */
export function makeStore(name: TStoreName) {
  return <T extends IConstructable>(constructor: T) => {
    container.bind(name).to(constructor).inSingletonScope();
    container.get(StoreStore).push(name, constructor);

    return injectable()(constructor);
  };
}
