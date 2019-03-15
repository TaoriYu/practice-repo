import * as apis from '../../config/externalApi';
import axios, { AxiosResponse } from 'axios';
import { path } from 'ramda';
import { AppConfigurationService, IConfigFields } from '../../config';
import { errorResponseInterceptor, responseInterceptor } from '../../di/utils/interceptors';
import { log } from '../logger';
import { container } from '../provider/container';
import { Api } from './api';

export type TRequestMethod = 'GET' | 'PATCH' | 'PUT' | 'POST' | 'DELETE';

export interface IParamsDeclaration {
  [n: string]: () => string | number;
}

export interface IDataDeclaration {
  [n: string]: () => string | number | object | undefined | null;
}

export interface IHeaderDeclaration {
  [n: string]: () => number | string | string[] | undefined;
}

export interface IOApiConfig<DTO, ErrorDTO> {
  configKey?: keyof typeof apis;
  method?: TRequestMethod;
  endpoint?: string | (() => string);
  dto: any;
  errorDto?: any;
  setter?: (d: DTO) => void;
  onError?: (d?: AxiosResponse<ErrorDTO>) => void;
  params?: IParamsDeclaration;
  data?: IDataDeclaration;
  headers?: IHeaderDeclaration;
}

const defaultParams: Partial<IOApiConfig<any, any>> = {
  configKey: 'defaultApi',
  method: 'GET',
  endpoint: '/',
};

/**
 * Создает instance класса API с настроенным инстансом axios.
 * Аргументы:
 *  - configKey - опционально, по умолчанию defaultApi. Ключ конфигурации из config/apis.
 *  - method    - опционально, по умолчанию GET. HTTP method.
 *  - endpoint  - опционально, по умолчанию /. Путь до api. Именно endpoint host и протокол берется из конфига при помощи configKey
 *  - dto       - обязательный! DTO class (class-transformer) используется для сериализации данных.
 *  - errorDto  - опционально тоже что и DTO только для ошибки с сервера.
 *  - setter    - cb для установки значения ответа с сервера, должна принимать ответа типа DTO в качестве аргумента.
 *  - onError   - cb в случае ошибки.
 *  - params    - Фабрика для QueryString аргументов.
 *  - data      - Фабрика для параметров post запроса.
 *
 * @example
 * class MyStore {
 *   \@observable public article?: ArticleDto;
 *   public slug: string;
 *   public id: number;
 *   public getArticleData = OApiFactory<ArticleDto>({
 *     configKey: 'articleApi', // отсюда получаем host protocol port и прочее
 *     method: 'GET',
 *     endpoint: () => '/v1/getArticle', // будет вызвана при вызове метода observe
 *     dto: ArticleDto, // ответ будет в виде ArticleDto
 *     errorDto: ArticleErrorDto, // ответ с кодом не 2ХХ будет в виде ArticleErrorDto
 *     setter: (article) => this.article = article; // когда запрос отработает вызовется setter и установит значение в store
 *     params: { id: () => this.id, slug: () => this.slug } // передзапросом. вызовет каждую из функций и сформирует params
 *   })
 * }
 *
 * const store = new MyStore();
 * store.id = 1;
 * store.slug = 'news';
 * autorun(store.article, (article) => console.log(article)) // undefined
 * autorun(store.getArticleData.state, (state) => console.log(state)) // 'idle'
 * store.getArticleData.observer()
 * // -> 'pending'
 * // -> 'fulfilled'
 * // -> { text: 'сатья статеевна пришла с бэкэнду', etc... }
 * // ==== еще один способ следить за состоянием ====
 *
 *
 * \@observable
 * class MyComponent extends React.Component {
 *   public componentDidMount() {
 *     this.props.myStore.getArticleData.observe();
 *   }
 *
 *   public render() {
 *     const { getArticleData } = this.props.myStore;
 *     switch (getArticleData.state) {
 *       case EApiState.pending: return <div> ...Загрузка </div>;
 *       case EApiState.fulfilled: return <div> <ArticleComponent /> </div>;
 *       case EApiState.rejected: return <div> Произошла ошибка </div>;
 *       default: return <div></div>;
 *     }
 *   }
 * }
 */
export function OApiFactory<
  DTO,
  ErrorDTO = {}
>(params: IOApiConfig<DTO, ErrorDTO>): Api<DTO, ErrorDTO> {
  const configuration = Object.assign({}, defaultParams, params);
  const url = typeof configuration.endpoint === 'function'
    ? configuration.endpoint()
    : configuration.endpoint;

  const axiosInstance = axios.create({
    ...getApiFromConfig(configuration.configKey!),
    method: configuration.method,
    url,
    transformResponse: [(rawData) => {
      try {
        return JSON.parse(rawData || '{}');
      } catch (e) {
        log('Net').error(`couldn't parse response data when executing: ${url}`);

        return {};
      }
    }],
  });

  axiosInstance.interceptors.response.use(
    responseInterceptor(configuration.dto),
    errorResponseInterceptor(configuration.errorDto),
  );
  const apiInstance = new Api<DTO, ErrorDTO>(axiosInstance);
  apiInstance.OApiConfig = configuration;

  return apiInstance;
}

function getApiFromConfig(key: keyof IConfigFields['internalApi']) {
  const apiPath = process.env.IS_SERVER
    ? ['serverRuntimeConfig', 'internalApi', key]
    : ['publicRuntimeConfig', 'externalApi', key];

  return path(apiPath, container.get(AppConfigurationService));
}
