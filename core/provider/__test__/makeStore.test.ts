/* tslint:disable:max-classes-per-file */
import { container } from '../container';
import { makeStore } from '../makeStore';

describe('make store test suite', () => {
  test('should bind class in singleton scope', () => {
    @makeStore(Store)
    class Store { public property = false; }
    const store = container.get(Store);
    expect(container.get(Store)).toBe(store);
    store.property = true;
    expect(container.get(Store).property).toBeTruthy();
  });
});
