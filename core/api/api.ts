import random from 'lodash/random';
import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { injectable, unmanaged } from 'inversify';
import { log, Logger } from '../logger';

export type TRunConfiguration =
  OmitKeys<AxiosRequestConfig, 'transformResponse' | 'adapter' | 'method' | 'url' | 'baseURL'>;

interface IExtendedAxiosRequestConfig extends AxiosRequestConfig {
  requestStartAt: Date;
  requestUniqueId: number;
}

/**
 * Class for working with http API, provide and instantiate axios instance from application
 * configuration
 * @see Transit
 * @example
 * class MyHttpRequester extends Api {
 *   public async getData(): IncomingSomeDTO {
 *     const response = await this.api.get('/data');
 *     return this.toDTO(IncomingSomeDTO, response.data);
 *   }
 *
 *   public async saveData(params: any): void {
 *     await this.api.post('/data', this.toDTO(OutgoingSomeDTO, params))
 *   }
 * }
 */
@injectable()
export class Api<DtoClass, ErrorDtoClass = {}> {
  public readonly api: AxiosInstance;
  /**
   * run with: evn DEBUG=App:Api:* npm run dev  - to debug on the server
   * and use localStorage.debug = "Api:*"  - to debug on the client
   */
  private apiDebug: Logger;

  private static generateCustomConfigProps() {
    return {
      requestStartAt: new Date().toISOString(),
      requestUniqueId: random(1000, 10000),
    };
  }

  public constructor(
    @unmanaged() keyOrInstance: AxiosInstance,
  ) {
    this.api = keyOrInstance as AxiosInstance;
    this.api.interceptors.request.use(this.requestLogger);
    this.api.interceptors.response.use(this.responseLogger);
    this.apiDebug = log(`Api:${this.api.defaults.baseURL}/${this.api.defaults.url}`);
  }

  /**
   * Runs configured request
   */
  public async run(config: TRunConfiguration) {
    const customs = Api.generateCustomConfigProps();
    try {
      return await this.api.request<DtoClass>({
        ...config,
        ...customs,
      });
    } catch (e) {
      this.errorLogger(e, customs.requestUniqueId);
      throw e as ErrorDtoClass;
    }
  }

  private errorLogger(error: AxiosError, id: number) {
    const errorType = error.response ? 'Response' : error.request ? 'Request' : 'Unrecognised';
    const errorLog
      = `\n=========== error ${id} ==========\n`
      + `  ${errorType} error\n`
      + `  Message: ${error.message}\n`
      + `  Stack: ${error.stack}\n`
      + `  Additional data: %O\n`
      + `=============== end ===============\n`;
    this.apiDebug.error(errorLog, error.response || {});
  }

  private requestLogger = (config: AxiosRequestConfig) => {
    const {
      timeout, baseURL, headers, data, method, params, url, requestUniqueId, requestStartAt,
    } = config as IExtendedAxiosRequestConfig;
    const requestLog
      = `\n=========== request ${requestUniqueId} ==========\n`
      + `  baseUrl: ${baseURL}\n`
      + `  url: ${url}\n`
      + `  params: %o\n`
      + `  method: ${method}\n`
      + `  timeout: ${timeout}\n`
      + `  headers: %O\n`
      + `  data: %O\n`
      + `  request start at: ${requestStartAt}\n`
      + `=============== end ===============\n`;
    this.apiDebug.debug(requestLog, params, headers, data);

    return config;
  }

  private responseLogger = (response: AxiosResponse) => {
    const { url, requestUniqueId, requestStartAt } = response.config as IExtendedAxiosRequestConfig;
    const execTime = (new Date().getTime() - new Date(requestStartAt).getTime());
    const responseLog
      = `\n=========== response ${requestUniqueId} ==========\n`
      + `  url: ${url}\n`
      + `  headers: %O\n`
      + `  data: %O\n`
      + `  cfg: %O\n`
      + `  request execution time: ${execTime}ms\n`
      + `================= end =================\n`;
    this.apiDebug.debug(responseLog, response.headers, response.data, response.config);

    return response;
  }
}
