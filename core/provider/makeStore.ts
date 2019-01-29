import { injectable, interfaces } from 'inversify';
import { container } from './container';
import Newable = interfaces.Newable;
import Abstract = interfaces.Abstract;

interface IOpts {
  singletonScope: boolean;
}

const defaultOpts = {
  singletonScope: true,
};

type TStoreName = string | Newable<{}> | Abstract<{}> | symbol;

export function makeStore(name: TStoreName, opts: IOpts = defaultOpts) {
  return <T extends IConstructable>(constructor: T) => {
    opts.singletonScope
      ? container.bind(name).to(constructor).inSingletonScope()
      : container.bind(name).to(constructor);

    return injectable()(constructor);
  };
}
