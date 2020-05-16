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

3. Установить модули sass препроцессора css ``npm install -D sass-loader node-sass``

4. Установиглобально [JSON Server](https://github.com/typicode/json-server) ``npm install -g json-server`` для создания фэйкового API

## Создание компонентов

1. Создай директорию **components** и в ней файл с названием компонента и расширением *.vue*

> Используй расширения **Vetur** для шаблона используй emmit набрав ``<v`` + tab

2. Подключи дочерний компонент в родительский, *прим.:* ``import vMainWrapper from './components/v-main-wrapper'``, объявить в разделе *components* и вписать в вёрстку как html-тег, *прим.:* ``<v-main-wrapper>``

> **v-main-wrapper** для Vue то же самое, что и **vMainWrapper** — делиние большими буквами равно дифисам

## Подключение Sass

1. Укажи настройки в корневом файле **vue.config.js**

2. Сделай импорт в файл **main.js**

3. В компоненте в блоке ``<style>`` укажи атрибут ``lang="scss"`` и можно писать стили сразу в scss

## Вывод массива

1. Вывод статического массива в родительском компоненте делай через ``v-fore="product in products"``, обязательно указать уникальный ключ в объекте из массива``:key="product.article"`` и передать в дочерний элемент очередной объект при переборе массива ``:product_data="product"``

2. В дочернем компоненте надо принять в разделе *props* элемент *product_data*, указать ему *type: Object* и что по умолчанию он возвращает пустой объект *return {}* — т.е. если массив пуст, то и карточек товара не будет

3. Подключи изображения указав путь в забайдненый атрибут *src* из папки проекта с переменным названием из объекта в массиве, *прим.:* :src="require('../assets/images/' + product_data.image)"
