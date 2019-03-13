import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { log, Logger } from '../logger';
import { errorLogMsg, requestLogMsg, responseLogMsg } from './apiLogMsg';
import { EApiErrorTypes, IExtendedAxiosRequestConfig } from './inrefaces';

export abstract class BaseAPi {
  /**
   * run with: evn DEBUG=App:*:Api:* npm run dev  - to debug on the server
   * and use localStorage.debug = "App:*:Api:*"  - to debug on the client
   */
  protected readonly apiDebug: Logger;
  protected readonly api: AxiosInstance;

  public constructor(
    keyOrInstance: AxiosInstance,
  ) {
    this.api = keyOrInstance as AxiosInstance;
    this.api.interceptors.request.use(this.requestLogger);
    this.api.interceptors.response.use(this.responseLogger);
    this.apiDebug = log(`Api:${this.api.defaults.baseURL}/${this.api.defaults.url}`);
  }

  protected errorLogger(error: AxiosError, id: number) {
    const errorType = error.response
      ? EApiErrorTypes.response
      : error.request
        ? EApiErrorTypes.request
        : EApiErrorTypes.unrecognized;

    const errorLog = errorLogMsg(id, errorType, error);
    this.apiDebug.error(errorLog, error.response || {});
  }

  protected requestLogger = (config: AxiosRequestConfig) => {
    const { headers, data, params } = config as IExtendedAxiosRequestConfig;
    const requestLog = requestLogMsg(config as IExtendedAxiosRequestConfig);
    this.apiDebug.debug(requestLog, params, headers, data);

    return config;
  }

  protected responseLogger = (response: AxiosResponse) => {
    const { url, requestUniqueId, requestStartAt } = response.config as IExtendedAxiosRequestConfig;
    const execTime = (new Date().getTime() - new Date(requestStartAt).getTime());
    const responseLog = responseLogMsg(requestUniqueId, url, execTime);
    this.apiDebug.debug(responseLog, response.headers, response.data, response.config);

    return response;
  }
}
