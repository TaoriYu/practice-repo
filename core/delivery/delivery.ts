import { makeStore } from '../provider';
import { container } from '../provider/container';

export interface IActionHandler {
  name: string;
  action(ctx: any): Promise<object>;
}

/**
 * Индентификатор для прокинутых с сервера свойств.
 * @example
 * class Example {
 *   constructor(@inject(DerivedProps) derivedProps: IMyDerivedProps) {
 *     this.exampleProps = derivedProps.someProperty;
 *   }
 * }
 */
export const DerivedProps = Symbol.for('derivedProps');

/**
 * Используется для доставки свойств с сервера на клиент. Умеет биндить свойства через DI
 * для тех классов которые их зказывают
 * @see withServerAction
 */
@makeStore(Delivery)
export class Delivery {
  private actions: IActionHandler[] = [];

  /**
   * Регистрирует action
   */
  public register<T>(name: string, action: (ctx: any) => Promise<object>) {
    this.actions = this.actions.concat([
      {
        name,
        action,
      },
    ]);
  }

  /**
   * Исполняет все actions, вызывает каждый передавая ему контекст, таким образом можно
   * осуществить роутинг, непосредственно в store который этот роутинг запрашивает.
   * Данные которые возвращает action биндит на конкретный класс, и они становятся доступны
   * через DI
   */
  public execute(ctx: any) {
    container.bind(DerivedProps).toConstantValue({}).whenTargetIsDefault();

    return Promise.all(this.actions.map(async ({ name, action }) => {
      const derivedProps = await action(ctx);
      this.bindDerived(derivedProps, name);

      return { name, derivedProps };
    }));
  }

  /**
   * Превязывает полученные свойства (результат action) к конкретному классу в DI
   * Превязка осуществляется только через строки или именнованные классы, функции.
   */
  public bindDerived(derivedProps: object, name: string) {
    container.bind(DerivedProps).toConstantValue(derivedProps).when(({ parentRequest }) => {
      if (parentRequest) {
        const { serviceIdentifier } = parentRequest;

        return typeof serviceIdentifier === 'function'
          ? serviceIdentifier.name === name
          : serviceIdentifier === name;
      }

      return false;
    });
  }
}
