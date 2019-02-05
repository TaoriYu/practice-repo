import { ClassType } from 'class-transformer/ClassTransformer';
import { Delivery } from '../delivery';
import { container } from './container';

interface IWithServerAction {
  serverAction: (ctx: any) => Promise<object>;
}

/**
 * Декоратор, регистрирует класс в сервисе Delivery, в последующем, используется сервисом
 * для передачи данных с сервера на клиент.
 */
export function withServerAction<T>(name?: string) {
  return (constructor: ClassType<T> & IWithServerAction) => {
    const delivery = container.get<Delivery>(Delivery);
    if (constructor.serverAction) {
      delivery.register(
        name || constructor.name,
        constructor.serverAction,
      );
    } else {
      throw new Error(
        'you marked class as "withServerAction", but' +
        'no static method is provided.',
      );
    }
  };
}
