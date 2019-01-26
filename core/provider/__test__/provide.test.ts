/* tslint:disable:max-classes-per-file */
import { container } from '../container';
import { provide } from '../provide';

describe('provide test suite', () => {
  test('should register class in container', () => {
    class Injected { }
    provide(Injected)(Injected);
    expect(container.get(Injected)).toBeInstanceOf(Injected);
  });

  test('should register class in container as symbol', () => {
    class InjectedSym { }
    provide(Symbol.for('InjectedSym'))(InjectedSym);
    expect(container.get(Symbol.for('InjectedSym'))).toBeInstanceOf(InjectedSym);
  });
});
