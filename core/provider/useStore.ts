import { interfaces } from 'inversify';
import { container } from './container';
import Newable = interfaces.Newable;

export function useStore<T extends Newable<InstanceType<T>>>(storeName: T): InstanceType<T> {
  return container.get(storeName);
}
