import { interfaces } from 'inversify';
import { NextContext } from 'next';
import Newable = interfaces.Newable;

/**
 * Свойства инстанса
 */
export interface ICheck {
  /** Выполняется только на сервере, результат передается в clientSide */
  serverSide(ctx: NextContext): Promise<object>;
  /** Выполняется только на клиенте */
  clientSide(derivedData: any): void;
}

/**
 * Статические свойства
 */
// tslint:disable-next-line:interface-name TCheck - naming for backward compatibility
export interface TCheck extends Newable<ICheck> {
  /** Проверка будет выполнена только для указанных страниц */
  includePages?: Array<Function | IConstructable>;
  /** Проверка НЕ будет выполнена для указанных страниц */
  excludePages?: Array<Function | IConstructable>;
  /**
   * Проверка будет выполнена только если pathname будет
   * подходить под регулярное выражение, или равен строке
   */
  includePaths?: Array<string | RegExp>;
  /**
   * Проверка НЕ будет выполнена если pathname будет
   * подходить под регулярное выражение, или равен строке
   */
  excludePaths?: Array<string | RegExp>;
}

export type TPathsValidator = Array<string | RegExp>;
export type TPagesValidator = Array<Function | IConstructable>;
