import * as http from 'http';
import { Response as NodeResponse } from 'node-fetch';

export type DefaultQuery = Record<string, string | string[] | undefined>;

/**
 * Так как импорт next на клиенте приводит к крашу, а нам нужен интерфейс для ТС, он
 * вынесен сюда.
 */
export interface INextFreeContext<Q extends DefaultQuery = DefaultQuery> {
  /** path section of URL */
  pathname: string;
  /** query string section of URL parsed as an object */
  query: Q;
  /** String of the actual path (including the query) shows in the browser */
  asPath: string;
  /** HTTP request object (server only) */
  req?: http.IncomingMessage;
  /** HTTP response object (server only) */
  res?: http.ServerResponse;
  /** Fetch Response object (client only) - from https://developer.mozilla.org/en-US/docs/Web/API/Response */
  jsonPageRes?: NodeResponse;
  /** Error object if any error is encountered during the rendering */
  err?: Error;
}
