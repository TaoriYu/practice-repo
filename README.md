# Frontend National Material Page.
Про соглашения и рекомендации по разработке react приложений **нужно** почитать в confluence.<br>
Язык коментариев и коммитов: Русский.<br>
Оступ: 2 **пробела**.<br>

**Эпик**: https://jira.corp.tass.ru/browse/TMRED-1972

**Макеты**: https://app.zeplin.io/project/5c5d46a821ae342cd2987966/dashboard

Репозиторий для страницы материала по проекту "Нацпроекты".

## Содержание
- [Запуск](#start)
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

<a name="start"></a>
## Запуск
Для запуска микросервиса вам потребуется:
1. установить lts версию node 10+
2. установить пакеты командой `npm install`
2.1. при первом запуске нужно сбилдить статику командой `npm run build:static`
3. для запуска в режиме разработки `npm run dev`
4. приложение будет доступно на порту **3000**

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
- [Mobx](https://mobx.js.org) - **версия 4** Для управления состоянием приложения.
- [Mobx-React](https://github.com/mobxjs/mobx-react) - Mobx в React
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

<a name="css-usage"></a>
## Использование CSS
Мы любим css модули [подробнее тут](https://github.com/css-modules/css-modules)

<a name="css-usage-global-styles"></a>
### Глобальные стили
Расположение в ./components/Head/globalCss/[cssName].css
импортим в Head.tsx

<a name="css-usage-classNames"></a>
### Использование classNames
Для мерджа стилей используем библиотеку classNames
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

