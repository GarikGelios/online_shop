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

3. Подключи изображения указав путь в забайдненый атрибут *src* из папки проекта с переменным названием из объекта в массиве, *прим.:* ``:src="require('../assets/images/' + product_data.image)"``

## Передача элемента на верх

1. На кнопку добавь событие ``@click="sendDataToParent"`` и обработай его в разделе *methods* добавив *$emit* — это значит отправить на верх, где первый аргумент обязательно имя встречающего события и последующие аргументы это передаваемые элементы ``this.$emit('sendArticle', this.product_data.article)``

2. В тэге дочернего компонента в родительском файле встречай событием с указанным методом который его обработает ``@sendArticle="showChildArticleInConsole"`` — метод примет агрументы и что-то с ними сделает, *прим.:* ``this.$emit('sendArticle', this.product_data.article)``

## Vuex & Axios — общаемся с API

1. Создай папку *vuex* с файлом store.js в который импортируй сам Vue.js ``import Vue from 'vue'``, модули Vuex ``import Vuex from 'vuex'`` и ``import axios from 'Axios'`` — укажи Vue использовать Vuex ``Vue.use(Vuex);``

2. Создай переменную store и опиши её опции ``let store = new Vuex.Store({ /*опции*/ });`` и экспортируй её ``export default store;`` — про оции читай в [документации](https://vuex.vuejs.org/ru/guide/state.html)

3. Импортирй *store* в файл *main.js* ``import store from './vuex/store'`` и добавь его к использованию в *new Vue* через запятую до рендеринга компонента *App*

4. Запусти тестовую базу ``json-server --watch db.json`` что бы получить ссылку API

5. В компонете каталога импортируй некоторые инструменты vuex ``import {mapActions, mapGetters} from 'vuex'``

6. Укажи в *methods* через инструмент vuex, что есть функция для получения API ``...mapActions([ 'GET_PRODUCTS_FROM_API' ])`` которая будет вызывать мутацию для *state*

7. Раздел *mounted* ждёт, как только отрендерится страница, чтобы запустить написанные в ней функции, впиши получение API ``mounted() { this.GET_PRODUCTS_FROM_API() }``

8. В разделе вычесляемых элементов *computed*, чтобы быстро получать из данные из *state* инструментом vuex укажи геттер списка продуктов ``...mapGetters([ 'PRODUCTS' ])`` — теперь его используй в цикле ``v-for="product in PRODUCTS"``

## Передача товара в корзину

1. Создай компонент *v-cart-item* и подключи его в *v-cart*

2. В *store* добавь пустой массив ``cart: []``, геттер для обращения к нему ``CART(state) { return state.cart; }``

3. Чтобы проверять наличие товара в корзине и по этому условию её отображать, передай в раздел *computed* с помощью *mapGetters* элемент *CART* и проверяй количество элементов в нём на компоненте *v-cart* ``v-if="CART.length"``

4. При клике на кнопку в товаре он должен передаваться в родителя полностью, с помощью ``@click="addToCart"`` и ``addToCart() { this.$emit('addToCart' ,this.product_data) }`` и в родителе приниматься ``@addToCart="addToCart"`` в тэге и в методе ``addToCart(data) { console.log(data); }``

5. Добавь в *store* экшн и мутацию на нажатие кнопки товара ``addToCart(data) { this.ADD_TO_CART(data) }`` — экшн в компоненте должен быть добавлен м методах к массиву *...mapActions*

6. Передай из *v-main-wrapper* в аттрибуте ``:cart_data="CART"`` дочернему *v-cart* как массив в пропс

7. Передай из *v-cart* в аттрибуте из массива *cart_data* каждый отдельный объект ``:cart_item_data="item"``. Прими объект в пропсах и заполни данные товара в *v-cart-item*

