# Шаблон React микросервиса

**Версия шаблона v0.3**

Про соглашения и рекомендации по разработке react приложений **нужно** почитать в confluence.<br>
Язык коментариев и коммитов: Русский.<br>
Оступ: 2 **пробела**.<br>

## Содержание
- [Создание нового микросервиса](#make-new-microservice)
- [Запуск](#start)
- [Запуск используя docker](#start-docker)
- [Необходимые глобальные зависимости](#global-deps)
- [Что из технологий используется](#usages)
- [Npm scripts](#npm-scripts)
  - [npm run dev](#npm-run-dev)
  - [npm run build](#npm-run-build)
  - [npm run start](#npm-run-start)
  - [npm run lint](#npm-run-lint)
  - [npm run lint:staged](#npm-run-lintstaged)
  - [npm run typecheck](#npm-run-typecheck)
  - [npm run test:w](#npm-run-test-w)
  - [npm run test:c](#npm-run-test-c)
- [Использование CSS](#css-usage)
  - [Глобальные стили](#css-usage-global-styles)
  - [Использование classNames](#css-usage-classNames)
- [Интеграция с IDE](#ide-integration)
- [Генерация кода](#code-generation)
  - [hygen store](#hygen-store)
  - [hygen component](#hygen-component)
  - [hygen config](#hygen-config)
  - [Я хочу добавить свой шаблон!](#custom-template)
- [Создание коммитов](#commit-creation)
- [Changelog](#changelog)

<a name="make-new-microservice"></a>
## Создание нового микросервиса
Для того что-бы развернуть новый микросервис нужно:
1. Создать новый репозиторий в bitbucket
    1. Создать репозиторий нужно публичный и в проекте например (TASS.RU)
    2. в названии репозитория указать назавние проекта по шаблону '_*-frontend_' пример: *tass-com-frontend*
    3. Репозиторию нужно дать permissions в разделе repository permissions нужно
добавить групы 'bitbucket-tm-developers' и 'jira-tm-developers-team' с доступами на write
    4. В разделе webhooks нажать create webhook, в качестве name указать teletassik, в качестве url
'https://teletass-tg.now.sh/dist/bitbucket.js', отметить все галки в разделе pull request
2. Локально склонить репозиторий шаблона
3. перейти в репозиторий и выполнить ```git remote remove origin```
4. ```git remote add origin {URL}``` (урл который получили в п1, URL вашего нового репозитория)
5. Поменять поле name в package.json c _template-app_ на название репозитория
6. Указать название репозитория в файле docker-compose.yml поле image из раздела app (там коментарий)
7. ```git commit -m "build(core): создание нового проекта"```
8. ```git push origin master```
9. Перейте в раздел branches нового репозитория, нажать многоточие, надать create branch from here,
название ветки - **develop** branch type - custom
10. перейте в раздел repository settings -> branching model
    1. выбрать use custom settings
    2. Development -> use branch name -> develop
    3. Production -> no production branch
    4. Branch prefixes
       1. Bugfix - галка стоит название ветки 'bugfix-'
       2. Feature - галка убрана
       3. Hotfix - галка стоит, название ветки 'hotfix-'
       4. Release - галка стоит, название ветки 'release-'
    5. Automatic merging - галка стоит.

<a name="start"></a>
## Запуск
Для запуска микросервиса вам потребуется:
1. установить lts версию node 10+
2. установить пакеты командой `npm install`
3. для запуска в режиме разработки `npm run dev`
4. приложение будет доступно на порту **3000**

<a name="start-docker"></a>
## Запуск используя docker
1. установить пакеты командой npm install
2. docker-compose up
3. приложение будет доступно на порту **3000**

<a name="global-deps"></a>
## Необходимые глобальные зависимости для разработки
- [Hygen](https://hygen.io/) - Используем для генерации кода `npm i -g hygen`

  Как использовать в проекте:
  - `hygen` - для получения списка генераторов
  - `hygen component help` - для получения справки по генератору (component заменяем на название генратора из пред. 
пункта)<br>
Больше информации о [hygen](#генерация-кода)
- [Commitizen](https://github.com/commitizen/cz-cli) - для автоматической генерации комитов `npm i -g commitizen`

  Как использовать в проекте:
  - `git cz` - дальше следуем инструкциям на экране

<a name="usages"></a>
## Что из технологий используется
- [Hygen](https://hygen.io/) - Генерация кода.
- [Inversify](http://inversify.io/) - Dependency injection.
- [Typescript](https://www.typescriptlang.org/index.html) - Статический анализатор.
- [TsLint](https://palantir.github.io/tslint/) - Линтер.
- [Jest](https://jestjs.io/) - Фреймворк для тестирования.
- [Commitizen](https://github.com/commitizen/cz-cli) - Генератор комитов.
- [Commitlint](https://github.com/marionebl/commitlint) - Линтер для комитов.
- [Mobx](https://mobx.js.org) - Для управления состоянием приложения.
- [Mobx-React-Lite](https://github.com/mobxjs/mobx-react-lite) - Mobx в React
- [React](https://reactjs.org) - Очень умный шаблонизатор.

<a name="npm-scripts"></a>
## Npm scripts
Команды которые можно использовать в директории с проектом:

<a name="npm-run-dev"></a>
### `npm run dev`
Запускает приложение в режиме разработки.<br>
Доступно по адресу [http://localhost:3000](http://localhost:3000).

Страничка обновляется при внесении изменений.<br>
Все ошибки отображаются в консоли.

<a name="npm-run-build"></a>
### `npm run build`
Собирает production версию приложения.<br>
Итоговая сборка лежит в папке **.next**. Сборка уже оптимизирована минифицированна и разбита на чанки.

<a name="npm-run-start"></a>
### `npm run start`
Запускает приложение в production режиме на порту 3000. Перед данной командой нужно выполнить
`npm run build`.

<a name="npm-run-lint"></a>
### `npm run lint`
Запускает lint для всего приложения целиком.

<a name="npm-run-lint:staged"></a>
### `npm run lint:staged`
Запускает lint только для staged файлов, файлы которые будут добавлены в коммит.

<a name="npm-run-typescheck"></a>
### `npm run typecheck`
Запускает typecheck для проверки по всему проекту.

<a name="npm-run-test-w"></a>
### `npm run test:w`
Запускает тесты для всего приложения. В режиме наблюдения (jest-cli)

<a name="npm-run-test-c"></a>
### `npm run test:c`
Запускает тесты для всего приложения. Собирает покрытие и открывает в окне браузера.

<a name="npm-run-analyze"></a>
### `npm run analyze`
Запускает webpack bundle analyzer

<a name="css-usage"></a>
## Использование CSS
Мы любим css модули [подробнее тут](https://github.com/css-modules/css-modules)

<a name="css-usage-global-styles"></a>
### Глобальные стили
??? Пока, специального места для глобальных стилей нет

<a name="css-usage-classNames"></a>
### Использование classNames
Для мерджа стилей используем библиотеку classNames

```typescript jsx
import { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './submit-button.css';

export default class SubmitButton extends PureComponent {
  render () {
    return (
      <button className={classNames(styles.firstClass, styles.secondClass)}>
        Войти
      </button>
    );
  }
};
```

Если несколько классов зависят от различных условий
```typescript jsx
import { PureComponent } from 'react';
import classNames from 'classnames/bind';
import styles from './submit-button.css';

let cx = classNames.bind(styles); // always throw bindings

export default class SubmitButton extends PureComponent {
  render () {
    let text = this.props.store.submissionInProgress ? 'Processing...' : 'Submit';
    let className = cx({
      base: true,
      inProgress: this.props.store.submissionInProgress,
      error: this.props.store.errorOccurred,
      disabled: this.props.form.valid,
    });
    return <button className={className}>{text}</button>;
  }
};
```

<a name="ide-integration"></a>
## Интеграция с IDE
В IDE лучше исключить папки .next и coverage из индекса, для лучшей производительности

<a name="code-generation"></a>
## Генерация кода
Для генерации кода используется инструмент [hygen](https://hygen.io/).
установка `npm i -g hygen` если не хотите ставить глобально можно юзать `npx hygen` (работать бдует дольше).

<a name="hygen-store"></a>
### `hygen store`
Генератор для создания сторов, и сущностей для них. Доступные генераторы:
- `hygen store help` - получение справки
- `hygen store new --name [store name]` - создает новый стор в папке stores с названием
store name и вложенным DTO, (во все index файлы будет добавлен референс на новый стор)
- `hygen store entity --name [entity name]` - создает фаил с класом с названием name в текущей директории
- `hygen store dto --name [dto name]` - создает фаил DTO с базовой имплементацией

<a name="hygen-component"></a>
### `hygen component`
Генератор для создания компонентов. Все команды создают компоненты в текущей директории.
- `hygen component help` - получение справки.
- `hygen component dir --name [component name] --pure` - создает директорию с компонентом с названием Сomponent
интерфейсами а так-же файлом styles.css и index файлом. Дефолтная имплементация компонента - функция, если
хотите что-бы был создан PureComponent, передайте аргумент --pure.
- `hygen component plain` - работает так-же как и dir затем исключением что создает просто фаил компонента без 
директории.

<a name="hygen-config"></a>
### `hygen config`
Генератор для создания конфигурации. В отличии от других генераторов, работает не в текущей директории, а только в 
директории config, независимо откуда будет вызвана комманда, группа будет создана именно в config.
- `hygen config help` - получение справки.
- `hygen config group --name [group name]` - создает группу конфигурации в папке config, патчит index файлы, добавляет 
необходимые интерфейсы в config.interfaces.ts, добавляет импорты в appConfig.
- `hygen config prop --name [prop name] --to [group name]` - создает новое свойство с названием prop name в группе с 
названием group name.

<a name="custom-template"></a>
### Я хочу добавить свой шаблон!
Не проблема, в папке core  есть папка с названием _templates - в ней вы можете создавать как шаблоны так и генераторы.

<a name="commit-creation"></a>
## Создание коммитов
для удобного создания комитов используется утилита [Commitizen](https://github.com/commitizen/cz-cli). установить 
можно коммандой `npm i -g commitizen`. Для использования нужно выбрать файлы которые хотите закомитить, и вместо `git
 commit` вызвать `git cz` дальше следуйте инструкциям на экране.<br>
commitizen позволит создать коммит в формате [conventional changelog](https://www.conventionalcommits.org/en/v1.0.0-beta.2/)
```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```
Не обязательно использовать commitizen но обязательно использовать формат указанный выше. Все комиты после создания 
валидируются утилитой commit-lint - т.е. вы не сможете создать коммит с другим сообщением.<br>
**type и scope в проекте регламентированы:**
### types
- build:     Сборка проекта или изменения внешних зависимостей
- ci:        Настройка CI и работа со скриптами
- docs:      Обновление документации
- feat:      Добавление нового функционала
- fix:       Исправление ошибок
- perf:      Изменения направленные на улучшение производительности
- refactor:  Правки кода без исправления ошибок или добавления новых функций
- revert:    Откат на предыдущие коммиты
- style:     Правки по кодстайлу (табы, отступы, точки, запятые и т.д.)
- test:      Добавление тестов

### scopes
- components: папка components, react компоненты и их составляющие.
- pages: странички и роутинг.
- tests: тесты.
- product: общий скоуп если у вас изменения по всем скоупам.
- configs: изменения в папке config и конфигурации.
- core: изменения в core проекта.
- stores: изменения в stores.

<a name="changelog"></a>
## Changelog

### v 0.3

**Features**

- Добавлен polyfill для symbol (поддержка IE 11);
- Добавлена версия в readme.md
- Стало возможно указать среду для сервера конфигурации через CONFIG_ENV, если не задан, по прежнему берется из NODE_ENV
- React + тайпинги подняты до версии 16.8.5
- Изменения в Ignition:
    - В проверки добавлен фильтр с возможностью указывать странички для которых они действуют.

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

- Next JS Версии 8
    - 16 times better memory usage with no degradation in performance.
    - Webpack Define Plugin больше не нужен: Теперь можно так

            // next.config.js
            module.exports = {
              env: {
                customKey: 'MyValue'
              }
            }

    - Full patch notes [https://nextjs.org/blog/next-8/](https://nextjs.org/blog/next-8/)
- OApiFactory - Observable Api Factory.
    - Не требует объявления в конструкторе
    - Теперь запросы к API можно делать более удобным способом.
        ```typescript
        class MyStore {
          @observable public article?: ArticleDto;
          public slug: string;
          public id: number;
          public getArticleData = OApiFactory<ArticleDto>({
            configKey: 'articleApi', // отсюда получаем host protocol port и прочее
            method: 'GET',
            endpoint: '/v1/getArticle',
            dto: ArticleDto, // ответ будет в виде ArticleDto
            errorDto: ArticleErrorDto, // ответ с кодом не 2ХХ будет в виде ArticleErrorDto
            setter: (article) => this.article = article, // когда запрос отработает вызовется setter и установит значение в store
            params: { id: () => this.id, slug: () => this.slug }, // передзапросом. вызовет каждую из функций и сформирует params
          });
        }
        ```

    - Аргументы:
        - **configKey** - опционально, (по умолчанию defaultApi). Ключ конфигурации из config/apis.
        - **method** - опционально, (по умолчанию GET). HTTP method. GET, POST, PUT, PATCH, DELETE.
        - **endpoint**  - опционально, (по умолчанию /). Путь до api. Именно endpoint host и протокол берется из конфига при помощи configKey
            ```typescript
            type endpoint = () => string | string;
            // если в endpoint указана функция она будет вызвана при вызове API.
            class Example {
              public id: number = 123;
              public getArticlesApi = OApiFactory({
                endpoint: () => `/api/v1/article/${this.id}`,
              });
            }
            const example = new Example();
            example.getArticlesApi.observe() // will go to /api/v1/article/123/
            
            example.id = 456;
            example.getArticlesApi.observe() // will go to /api/v1/article/456/
            ```
        - **dto** - обязательный! DTO class (class-transformer) используется для сериализации данных.
        - **errorDto** - опционально тоже что и DTO только для ошибки с сервера.
        - **setter** - callback для установки значения ответа с сервера, должна принимать ответа типа DTO в качестве аргумента.
            ```typescript
            class Example {
              public articles: ArticlesDTO[] = [];
              public getArticlesApi = OApiFactory<ArticlesDTO[]>({
                endpoint: '/api/v1/articles',
                dto: ArticlesDTO,
                errorDto: ArticlesErrorDTO,
                // После успешного получения ответа с сервера будет вызвана
                // функция переданная в setter. 
                setter: (data) => this.articles = data,
                onError: (err: ArticlesErrorDTO) => /* some error code here */,
              });
            }
            
            const example = new Example();
            await example.getArticlesApi.observer();
            console.log(example.articles) // -> [Article{}, Article{}, Article{}];
            ```
        - **onError** - callback в случае ошибки.
        - **params** - Фабрика для QueryString аргументов.
            ```typescript
            class Example {
              public id: number = 123;
              public slug: string = 'kulesh';
              public getArticlesApi = OApiFactory<ArticlesDTO[]>({
                endpoint: '/api/v1/articles',
                // перед отправкой запроса, будет вызван callback для получения актуальных
                // данных параметров, если функция вернула undefined она будет отфильтрована из параметров
                params: ({ id: () => this.id, slug: () => this.slug, other: () => undefined }),
              });
            }
            
            const example = new Example();
            example.id = 777;
            example.getArticlesApi.observe() // will go on /api/v1/articles?id=123&slug=kulesh
            ```
        - **data** - Фабрика для параметров post запроса.

            // см. params

    - API теперь умеет сохранять состояние запроса.
        ```typescript
        class Example {
          public getArticlesApi = OApiFactory<ArticlesDTO[]>({
            endpoint: '/api/v1/articles',
          });
        }
        
        const example = new Example();
        console.log(example.getArticlesApi.state); // idle
        example.observe();
        console.log(example.getArticlesApi.state); // pending
        console.log(example.getArticlesApi.state); // fulfilled
        // можно подписаться на state используя autorun или reaction
        autorun(store.getArticleData.state, (state) => console.log(state));
        ```
- Удален semantic-ui из бойлерплейта.
- Удален lodash.
- Добавлена ramda
- Docker
    - docker-compose up - поднимает dev стенд с nginx на 8080. Напрямую (в обход nginx) приложение доступно через 3000
    - nginx.conf в папке с проектом, позволяет настраивать роутинги на backend что-бы не биться об CORS.
    После настроек docker-compose restart
        ```nginx
        # для добавлеия нового роутинга:
        #            _____ Путь до api в backend
        #           /
        location /api {
          Host:       domain.preprod.itass.local # <- указываем только если идём в наш препрод
          proxy_pass  http://domain.prerprod.itass.local/api;
        #                              \__ адрес где хостится апишка
        }
        ```
    - docker-compose up app - поднимает приложение на 3000 порту. без nginx

- Сильно упорядочен next.config.js
- Введена папка Less в компонентах где располагаются глобальные less переменные и миксины
- Collection data type теперь deprecated
- Базовая логика _app.tsx перенеcена в core, для упрощения работы с шаблоном.
- Новая система store ingection
    - Переход на более современный [mobx-react-lite](https://github.com/mobxjs/mobx-react-lite).
        - Отказ от декораторов в пользу функций.
        - Более удобное API
        - Поддержка класс компонентов через костыли (здравствуй будущее реакт)
    - Появилась возможность инжектить stores в функциональные компоненты.
    - Сторы теперь помещаются в уникальные контексты di
    - Более простой и понятный синтаксис
        ```typescript jsx
        // Пример с декларацией observer через функцию
        export function Main() {
          const uiStore = useStore<UiStore>(UiStore); // get store
          const setName = () => uiStore.setName('asd');
        
          return useObserver(() => (
            <div>
              <div onClick={setName} className={styles.style}>{uiStore.name}</div>
              {uiStore.name === 'asd' &&
                <SomeComponent />
              }
            </div>
          ));
        }
        
        // Пример с использованием Observer Как компонент
        export function Some() {
          const someStore = useStore<SomeStore>(SomeStore);
        
          return (
            <div>
              <p> User Name Is: </p>
              <Observer>{() => <p>{someStore.name}</p>}</Observer>
            </div>
          );
        }
        ```
    - Для компонентов классов по прежнему поддерживается синтаксис injectStore.
- Работа с полифилами
    - Работа с полифилами стала удобнее, теперь достаточно включить нужный полифил из библиотеки corejs (или любой другой) в файле polyfill.js
    - Полифилы отрабатывают и в серверной и в клиентской части, обеспечивая одинаковое поведение кода, и там и тут.
- Добавили react hook для IntersectionObserver

    *useIntersectionObserver* - это реакт хук, который предоставляет интерфейс для работы с IntersectionObserver.

    - Подробнее о том,что такое *IntersectionObserver.*

        [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

        **TL;DR:** IntersectionObserver это новое удобное апи контроля того, что один элемент пересекает другой (такой инструмент очень нужнен, когда требуется: включить анимацию, когда доскролливаем до определенного сегмента; бесконечный скролл и т.д. и т.п. Конечно же, можно каждый раз писать свою собственную шарманку, но появление единого инструмента для решения подобных задач экономит время и нервы).

    - Подробнее о том, что такое React Hooks.

        [Introducing Hooks - React](https://reactjs.org/docs/hooks-intro.html)

    *useIntersectionObserver* работает как обычный реакт хук:

    @param options - это опции настройки *IntersectionObserver*. В них можно передать:

    - root - элемент, с которым пересечётся target (за которым мы следим) элемент. По умолчанию это viewport.
    - rootMargin - служит для того, чтобы увеличивать или уменьшать каждую сторону bbox'a рута перед вычислениемпересечений. По умолчанию 0px
    - threshold - массив значений, от 0 до 1, в которых будет прокать колбэк. Например, если мы хотим, чтобы наш колбэксрабатывал каждые 25% видимости target элемента, нужно просетить такой массив: [0, 0.25, 0.5, 0.75, 1]. Поумолчанию [].

    @returns [ref, registerCallback] - возвращает массив из двух элементов:

    - ref - это реф таргет элемента; с помощью него мы подцепляем html элемент к *IntersectionObserver*
    - registerCallback - функция, которая принимает колбэк и регистрирует его в списке колбэков, который потом исполняет по очереди регистрации. Такой подход обеспечивает возможность подключения нескольких колбэков к одному обзёрверу.

    ### Как его использовать?
    ```
        /***********************************************************
         * ОЧЕНЬ ВАЖНОЕ УТОЧНЕНИЕ                                  *
         * useIntersectionObserver, как и любой другой react hook  *
         * можно использовать только в функциональных компонентах! *
         ***********************************************************/
    ```
    *Предположим, что мы хотим сверстать такой html-блок, у которого будет меняться прозрачность по слудеющему правилу: 
    если блок полностью показывается во viewport, то блок полностью непрозрачен (т.е. opacity = 1), если блок полностью 
    скрылся - то блок становится полностью прозрачным (т.е. opacity = 0).*
    ```typescript jsx
        // подготовим массив threshold - мы хотим, чтобы шаг срабатывания
        // коллбэка был 0.01, соответственно создадим 100 значений
        const threshold: number[] = range(0.01, 100).map((_n, i) => i / 100);
        
        export function GreenBlock() {
            // используем хук useState, чтобы получить состояние opacity и функцию,
            // которая может его менять
            const [ratio, setRatio] = React.useState(1);
            
            // используем хук useIntersectionObserver, чтобы получить ref и
            // registerCallback, чтобы зарегистрировать наш коллбэк. Передадим
            // в useIntersectionObserver наш сгенерированный массив threshold.
            const [ref, registerCallback] = useIntersectionObserver<HTMLDivElement>({ threshold });
            
            // вызовем registerCallback и передадим ему функцию, которая принимает
            // entries (массив объектов, который нам предоставляет
            // IntersectionObserver) и для каждой entry сетим в наш стейт значение
            // intersectionRatio. Таким образом opacity будет меняться в зависимости
            // от вхождения таргета во viewport с шагом 0.01
            registerCallback((entries: IntersectionObserverEntry[]) => {
              entries.forEach(pipe(prop('intersectionRatio'), setRatio));
            });
        
            return (
              <div ref={ref} style={{ backgroundColor: `rgba(50, 205, 0, ${ratio})` }}>
                some square
              </div>
            );
          }
    ```

    В данном примере прозрачность зелёного блока зависит от состояния компонента *ratio,* которое изменяется в пределах
    от 0 до 1. Изменение ratio обеспечивает колбэк, который принимает *entries* - позиции, соответствующие массиву
    threshold -  которые в свою очередь предоставляет нам useIntersectionObserver, в котором мы регистрируем
    наш коллбэк.

    ### F.A.Q.

    ***А что же делать, если нам нужно использовать Component или PureComponent?***

    Увы, придётся всё-таки сделать из него функциональных компонент с хуками и профурсетками. Подход к снаряду с целью
    сделать реализацию IntersectionObserver на обычном реакт компоненте, который бы вёл себя как обёртка. К сожалению,
    такая реализация получилась громоздкой и неудобной в использовании. Реализация в виде хука намного
    проще и прозчраней.

- Добавлены скрипты:
    - npm run analyze - запускает webpack bundle analyzer, отчет открывается в браузере
    - npm run analyze:s -  генерирует тот же отчет что и
    analyze но сохраняет его в ./ проекта в виде bundle-report.html (необходим для bamboo)
- Добавлен mocha coverage reporter - для bamboo. Позволяет парсить результаты тестов при помощи bamboo

### Fixes

- Исправлена ошибка когда при возникновении network exception по причинам сети либо CORS, открывался overlay
with couldn't get property _options of undefined
- Исправлена ошибка когда сессии пользователей переписывали друг-друга так как определялись в едином сторе
- Исправлена ошибка с чрезмерным потреблением памяти в DI Context.
- Исправлена ошибка с переопредлением контейнера DI в dev режиме после HMR что приводило к потере
данных полученных с сервера
- Runtime settings в dev режиме теперь не активен.
- Исправлена проблема, когда в dev режиме терялся конфиг на клиенте после HMR.
- И еще три ведра багов.
