import { AxiosError } from 'axios';
import { EApiErrorTypes } from './inrefaces';
import { pathOr } from 'ramda';

export function errorLogMsg(id: number, errorType: EApiErrorTypes, error: AxiosError) {
  const url = errorType === EApiErrorTypes.response
    ? error.response!.config.url
    : pathOr('unrecognised', ['request', '_options', 'path'], error);

  return `\n=========== error ${id} ==========\n`
    + `  ${errorType} error\n`
    + `  url: ${url}\n`
    + `  code: ${errorType === EApiErrorTypes.response ? error.response!.status : '418'}\n`
    + `  err_code: ${error.code}\n`
    + `  Message: ${error.message}\n`
    + `  Stack: ${error.stack}\n`
    + `  Additional data: %O\n`
    + `=============== end ===============\n`;
}

export interface IRequestLogArgs {
  requestUniqueId?: number;
  baseURL?: string;
  url?: string;
  method?: string;
  timeout?: number;
  requestStartAt?: Date;
}

export function requestLogMsg(args: IRequestLogArgs) {
  const {
    requestUniqueId,
    baseURL,
    url,
    method,
    timeout,
    requestStartAt,
  } = args;

  return `\n=========== request ${requestUniqueId} ==========\n`
    + `  baseUrl: ${baseURL}\n`
    + `  url: ${url}\n`
    + `  params: %o\n`
    + `  method: ${method}\n`
    + `  timeout: ${timeout}\n`
    + `  headers: %O\n`
    + `  data: %O\n`
    + `  request start at: ${requestStartAt}\n`
    + `=============== end ===============\n`;
}

export function responseLogMsg(requestUniqueId: number, url?: string, execTime?: number) {
  const dataFormatModifier = process.env.IS_SERVER ? '%j' : '%O';

  return `\n=========== response ${requestUniqueId} ==========\n`
    + `  url: ${url}\n`
    + `  headers: %O\n`
    + `  data: ${dataFormatModifier}\n`
    + `  cfg: %O\n`
    + `  request execution time: ${execTime}ms\n`
    + `================= end =================\n`;
}
