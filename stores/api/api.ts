import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import debug from 'debug';
import { injectable, unmanaged } from 'inversify';
import { IConfigFields } from '../../config/types/IConfig';
import { publicConfig } from '../../config/utils/publicConfig';
import { OmitKeys } from '../../types/helpers';
import { container } from '../provider/container';

export type ApiCfg = keyof IConfigFields['apis'] | AxiosInstance;
export type TRequestMethod = 'GET' | 'PATCH' | 'PUT' | 'POST' | 'DELETE';
export type ApiFactory<D> = (apicfg: ApiCfg, method: TRequestMethod, endpoint: string, dto: ClassType<D>) => Api<D>;

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

  public constructor(@unmanaged() keyOrInstance?: ApiCfg) {
    if (typeof keyOrInstance === 'string' || typeof keyOrInstance === 'number') {
      this.api = axios.create({ ...publicConfig('apis')[keyOrInstance] });
    } else if (typeof keyOrInstance !== 'undefined') {
      this.api = keyOrInstance as AxiosInstance;
    } else {
      this.api = axios.create({ ...publicConfig('apis').defaultApi });
    }

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

/* unique identifier for Api class, we can't inject Api itself but we need a way to inject it throw factory */
const identifier = Symbol.for(Api.toString());
container.bind(identifier).toConstructor(Api);
container.bind(Api).toFactory((context) =>
  (apicfg: keyof IConfigFields['apis'], method: TRequestMethod, endpoint: string, dto: ClassType<{}>) => {
    const apiConstructor = context.container.get<typeof Api>(identifier);
    /* creating instance with predefined data from factory, we can't change this parameters later */
    const apiConfiguration = axios.create({
      ...publicConfig('apis')[apicfg],
      method,
      url: endpoint,
      transformResponse: [(rawData) =>
        plainToClass(dto, JSON.parse(rawData), { strategy: 'excludeAll' })
      ],
    });

    return new apiConstructor(apiConfiguration);
  });
