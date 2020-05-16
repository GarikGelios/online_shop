# online_shop
[Интернет-магазин на Vue.js за 4 часа](https://www.youtube.com/playlist?list=PLb6TvuNosCJW_N3wqAUYsp7DvUzfyvbvB)

- Project setup ``npm install``

- Compiles and hot-reloads for development ``npm run serve``

- Compiles and minifies for production ``npm run build``

- Lints and fixes files ``npm run lint``

- Customize configuration See [Configuration Reference](https://cli.vuejs.org/config/).

## Установка зависимостей

1. Установка [Vuex](https://vuex.vuejs.org/ru/installation.html) как хранилища данных ``npm install vuex --save``

2. Установка [Axios](https://github.com/axios/axios) [для доступа к API](https://ru.vuejs.org/v2/cookbook/using-axios-to-consume-apis.html)  ``npm install axios``

3. Добавить в файле **pakage.json** в раздел *devDependencies* модули препроцессора css **"node-sass": "^4.14.1"** и **"sass-loader": "^8.0.2"** и проинсталировать их ``npm install``

4. Установить глобально [JSON Server](https://github.com/typicode/json-server) ``npm install -g json-server`` для создания фэйкового API

## Создание компонентов

1. Создай директорию **components** и в ней файл с названием компонента и расширением *.vue*

> Используй расширения **Vetur** для шаблона используй emmit набрав ``<v`` + tab

2. Подключи дочерний компонент в родительский, *прим.:* ``import vMainWrapper from './components/v-main-wrapper'``, объявить в разделе *components* и вписать в вёрстку как html-тег, *прим.:* ``<v-main-wrapper>``

> **v-main-wrapper** для Vue то же самое, что и **vMainWrapper** — делиние большими буквами равно дифисам
