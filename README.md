# Шаблон React микросервиса
Про соглашения и рекомендации по разработке react приложений **нужно** почитать в confluence.<br>
Язык коментариев и коммитов: Русский.<br>
Оступ: 2 пробела.<br>

## Содержание
- [Создание нового микросервиса](#создание-нового-микросервиса)
- [Запуск](#запуск)
- [Необходимые глобальные зависимости](#необходимые-глобальные-зависимости-для-разработки)
- [Что из технологий используется](#что-из-технологий-используется)
- [Npm scripts](#npm-scripts)
  - [npm run dev](#npm-run-dev)
  - [npm run build](#npm-run-build)
  - [npm run start](#npm-run-start)
  - [npm run lint](#npm-run-lint)
  - [npm run lint:staged](#npm-run-lintstaged)
  - [npm run typecheck](#npm-run-typecheck)
  - [npm run test](#npm-run-test)
- [Использование CSS](#использование-css)

## Создание нового микросервиса
Для того что-бы развернуть новый микросервис нужно:
1. Форкнуть репозиторий [шаблона](https://bitbucket.corp.tass.ru/projects/TASS/repos/react-microservice-template)
2. В названии репозитория указать назавние проекта по шаблону '_*-frontend_' пример: *tass-com-frontend*
3. Склонировать репозиторий и удалить из него все ветки кроме **master**
4. Если используете git-flow необходимо создать ветку develop и выбрать ее в настройках как default branch
5. Склонировать проект
6. Поменять поле name в package.json c _template-app_ на название репозитория
7. закомитить изменения

## Запуск
Для запуска микросервиса вам потребуется:
1. установить lts версию node 10+
2. установить пакеты командой `npm install`
2.1. при первом запуске нужно сбилдить статику командой `npm run build:static`
3. для запуска в режиме разработки `npm run dev`
4. приложение будет доступно на порту **3000**

## Необходимые глобальные зависимости для разработки
- [Hygen](https://hygen.io/) - Используем для генерации кода `npm i -g hygen`

  Как использовать в проекте:
  - `hygen` - для получения списка генераторов
  - `hygen component help` - для получения справки по генератору (component заменяем на название генратора из пред. 
пункта)
- [Commitizen](https://github.com/commitizen/cz-cli) - для автоматической генерации комитов `npm i -g commitizen`

  Как использовать в проекте:
  - `git cz` - дальше следуем инструкциям на экране

## Что из технологий используется
- [Hygen](https://hygen.io/) - Генерация кода.
- [Inversify](http://inversify.io/) - Dependency injection.
- [Typescript](https://www.typescriptlang.org/index.html) - Статический анализатор.
- [TsLint](https://palantir.github.io/tslint/) - Линтер.
- [Jest](https://jestjs.io/) - Фреймворк для тестирования.
- [Commitizen](https://github.com/commitizen/cz-cli) - Генератор комитов.
- [Commitlint](https://github.com/marionebl/commitlint) - Линтер для комитов.
- [Mobx](https://mobx.js.org) - Для управления состоянием приложения.
- [Mobx-React](https://github.com/mobxjs/mobx-react) - Mobx в React
- [React](https://reactjs.org) - Очень умный шаблонизатор.

## Npm scripts
Команды которые можно использовать в директории с проектом:
### `npm run dev`
Запускает приложение в режиме разработки.<br>
Доступно по адресу [http://localhost:3000](http://localhost:3000).

Страничка обновляется при внесении изменений.<br>
Все ошибки отображаются в консоли.

### `npm run build`
Собирает production версию приложения.<br>
Итоговая сборка лежит в папке **.next**. Сборка уже оптимизирована минифицированна и разбита на чанки.

### `npm run start`
Запускает приложение в production режиме на порту 3000. Перед данной командой нужно выполнить
`npm run build`.

### `npm run lint`
Запускает lint для всего приложения целиком.

### `npm run lint:staged`
Запускает lint только для staged файлов, файлы которые будут добавлены в коммит.

### `npm run typecheck`
Запускает typecheck для проверки по всему проекту.

### `npm run test`
Запускает тесты для всего приложения.<br>
Для перехода в режим наблюдения запускаем командой `npm run -- --watch`.<br>
Для запуска со сборкой покрытия `npm run -- --coverage`.

## Использование CSS
Мы любим css модули [подробнее тут](https://github.com/css-modules/css-modules)

## Интеграция с IDE
В IDE лучше исключить папки .next и coverage из индекса, для лучшей производительности
