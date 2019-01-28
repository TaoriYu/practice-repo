/* tslint:disable:max-classes-per-file */
import { container } from '../container';
import { makeStore } from '../MakeStore';

describe('make store test suite', () => {
  test('should bind class in singleton scope', () => {
    @makeStore(Store)
    class Store { public property = false; }
    const store = container.get(Store);
    expect(container.get(Store)).toBe(store);
    store.property = true;
    expect(container.get(Store).property).toBeTruthy();
  });

  test('should bin class in normal score', () => {
    @makeStore(Store, { singletonScope: false })
    class Store { public property = false; }
    const store = container.get(Store);
    expect(container.get(Store)).not.toBe(store);
    expect(container.get(Store)).toBeInstanceOf(Store);
  });
});
