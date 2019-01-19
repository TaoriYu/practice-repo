import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import debug from 'debug';
import { injectable, unmanaged } from 'inversify';

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
export class Api<DtoClass> {
  public readonly api: AxiosInstance;
  /**
   * run with: evn DEBUG=Api:* npm run dev  - to debug on the server
   * and use localStorage.debug = "Api:*"  - to debug on the client
   */
  private apiDebug = debug(`Api:${this.constructor.name}`);

  public constructor(
    @unmanaged() keyOrInstance: AxiosInstance
  ) {
    this.api = keyOrInstance as AxiosInstance;

    this.api.interceptors.request.use(this.requestLogger);
    this.api.interceptors.response.use(this.responseLogger);
  }

  /**
   * Runs configured request
   * @param {OmitKeys<AxiosRequestConfig, "transformResponse" | "adapter" | "method" | "url" | "baseURL">} config
   * @returns {AxiosPromise<DtoClass>}
   */
  public run(config: OmitKeys<AxiosRequestConfig, 'transformResponse' | 'adapter' | 'method' | 'url' | 'baseURL'>) {
    return this.api.request<DtoClass>(config);
  }

  private requestLogger = (config: AxiosRequestConfig) => {
    const { timeout, baseURL, headers, data, method, params, url } = config;

    this.apiDebug('==request==');
    this.apiDebug({ timeout, baseURL, headers, data, method, params, url });
    this.apiDebug('====end====');

    return config;
  }

  private responseLogger = (response: AxiosResponse) => {
    const { baseURL, url } = response.config;

    this.apiDebug('==response==');
    this.apiDebug('urls: %o', { baseURL, url });
    this.apiDebug('headers: %O', response.headers);
    this.apiDebug('data: %O', response.data);
    this.apiDebug('====end====');

    return response;
  }
}
