import { injectable, interfaces } from 'inversify';
import { container } from './container';
import Newable = interfaces.Newable;
import Abstract = interfaces.Abstract;

export function provideSingleton(name: string | Newable<{}> | Abstract<{}> | symbol) {
  return <T extends { new(...args: any[]): {} }>(constructor: T) => {
    container.bind(name).to(constructor).inSingletonScope();

    return injectable()(constructor);
  };
}
