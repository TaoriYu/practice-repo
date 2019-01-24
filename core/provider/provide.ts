import { injectable, interfaces } from 'inversify';
import { container } from './container';
import Newable = interfaces.Newable;
import Abstract = interfaces.Abstract;

export function provide(name: string | Newable<{}> | Abstract<{}> | symbol) {
  return <T extends IConstructable>(constructor: T) => {
    container.bind(name).to(constructor);

    return injectable()(constructor);
  };
}
