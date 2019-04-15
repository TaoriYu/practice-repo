import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';
import { observable } from 'mobx';
import { fromPromise } from 'mobx-utils';
import { random } from '../../utils/fn';
import { BaseAPi } from './baseApi';
import { EApiState, TRunConfiguration } from './inrefaces';
import { IOApiConfig } from './oApiFactory';
import { call, map, propOr, identity, prop, filter, complement, isNil } from 'ramda';
import invariant from 'invariant';

/**
 * Абстракция над AXIOS для работы с HTTP-API, преднастроеным из AppConfig
 * Для создания инстанса Api используются хэлперы apiFactory и OApiFactory
 * @see OApiFactory см для подробностей
 * @see apiFactory - deprecated
 * @example
 * class MyStore {
 *   public getArticleData = OApiFactory({ // configuration here // }) // <- creates api instance
 * }
 * // somewhere in the app
 * container.get(MyStore).getArticleData.observe()
 */
export class Api<DtoClass, ErrorDtoClass = {}> extends BaseAPi {
  /**
   * state запроса.
   */
  @observable public state: EApiState = EApiState.idle;
  public value?: AxiosResponse<DtoClass>;
  public errorValue?: AxiosResponse<ErrorDtoClass>;
  public OApiConfig?: IOApiConfig<any, any>;
  private requestToken?: CancelTokenSource;

  /**
   * Метки для идентификации реквеста, и измерения длительности.
   */
  private static generateCustomConfigProps() {
    return {
      requestStartAt: new Date().toISOString(),
      requestUniqueId: random(10000, 1000),
    };
  }

  /**
   * Запускает реквест в "сыром виде".
   * метод run предоставляет возможность програмно управлять процессом выполнения запроса.
   * игнорирует конфигурацию из OApiFactory, необходимо конфигурировать вручную.
   */
  public async run(config: TRunConfiguration) {
    const customs = Api.generateCustomConfigProps();
    try {
      return await this.api.request<DtoClass>({ ...config, ...customs });
    } catch (e) {
      this.errorLogger(e, customs.requestUniqueId);
      throw e as AxiosError;
    }
  }

  /**
   * Запускает сконфигурированный при помощи OApiFactory запрос.
   * Возвращает "PromiseLike" Observable работа почти ни чем не отличается от Promise за исключением
   * отсутствия метода catch.
   * @see fromPromise
   */
  public observe = (config: AxiosRequestConfig = {}) => {
    invariant(this.OApiConfig, 'Couldn\'t observe request. Your API class created by' +
      'old version of APIFactory, or OApiConfiguration didn\'t provided.' +
      'please use new OApiFactory instead');

    this.regenerateToken();
    this.clearState();

    const customConfigFields = Api.generateCustomConfigProps();
    const axiosConfig: AxiosRequestConfig = {
      cancelToken: this.requestToken!.token,
      url: this.refreshUrl(),
      params: this.getOApiParams(),
      data: this.getOApiData(),
      ...config,
      ...customConfigFields,
    };

    const fetchObserver = fromPromise(this.api.request<DtoClass>(axiosConfig));

    fetchObserver.then(
      this.handleOApiSuccess,
      this.handleOApiError(customConfigFields.requestUniqueId),
    );

    return fetchObserver;
  }

  private refreshUrl() {
    return typeof this.OApiConfig!.endpoint === 'function'
      ? this.OApiConfig!.endpoint()
      : this.OApiConfig!.endpoint;
  }

  private handleOApiError = (requestId: number) => (e: AxiosError) => {
    const errorResponse = e.response ? e.response : undefined;
    this.state = EApiState.rejected;
    this.errorValue = errorResponse;
    if (this.OApiConfig && this.OApiConfig.onError) {
      this.OApiConfig.onError(prop('data', errorResponse!));
    }
    this.errorLogger(e, requestId);
  }

  private handleOApiSuccess = (data: AxiosResponse<DtoClass>) => {
    this.value = data;
    this.state = EApiState.fulfilled;
    this.requestToken = undefined;
    call(propOr(identity, 'setter', this.OApiConfig!), this.value.data);
  }

  private regenerateToken() {
    if (this.requestToken) {
      this.apiDebug.warn('attempt to cancel duplicated request');
      // TODO enable after testing
      // this.requestToken.cancel('Canceled because new request has arrived');
      this.requestToken = axios.CancelToken.source();
    } else {
      this.requestToken = axios.CancelToken.source();
    }
  }

  private clearState() {
    this.value = undefined;
    this.errorValue = undefined;
    this.state = EApiState.pending;
  }

  private getOApiParams() {
    return map(call, propOr({}, 'params', this.OApiConfig!));
  }

  private getOApiData() {
    return filter(
      complement(isNil),
      map(call, propOr({}, 'data', this.OApiConfig!)),
    );
  }
}
