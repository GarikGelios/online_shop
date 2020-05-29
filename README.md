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

1. Вывод статического массива в родительском компоненте делай через ``v-for="product in products"``, обязательно указать уникальный ключ в объекте из массива``:key="product.article"`` и передать в дочерний элемент очередной объект при переборе массива ``:product_data="product"``

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

8. Как только генерируется новый *v-cart-item* надо реактивно добавлять ему свойство о количестве ``mounted() { this.$set(this.cart_item_data, 'quantity', 1 ) }`` — выведи его в компоненте

9. В мутации *SET_CART* добавь проверку, если товар уже есть, то надо только увеличивать его количество

10. На кноку *Delete* повесь событие на клик и из метода передай его наверх. Прими в родителе направив в его метод с индексом из перебора массива ``deleteFromCart(index){ this.DELETE_FROM_CART(index) }``

11. В *store* создай экшн *DELETE_FROM_CART* который заставит мутацию удалять из массива элемент по индексу ``REMOVE_FROM_CART: (state, index) => { state.cart.splice(index, 1) }``

## Vue Router — отдельные страницы в приложении

1. Установи [Vue Router](https://router.vuejs.org/installation.html) командой ``npm install vue-router``

2. Создай директорию *src/router* и в ней файл *router.js* в который сделай импорты ``import Vue from 'vue'``, ``import Router from 'vue-routert'`` и укажи использвать *router* во *vue* ``Vue.use(Router);``

3. Импортируй компоненты *vCatalog* и *vCart*, которые будут доступны по разным url и добавь их внутри роутера ``let router = new Router({ routes: [ ... ]})`` в руты как объекты массива *routes* ``{ path: "/", name: "catalog", component: vCatalog }`` и если необходимо передовать данные то и ``props: true``. В конце файла добавь экспорт ``export default router``

4. Импортируй *router* в файл *main.js* и добавь к используемым во *Vue*

5. В оберточном компоненте добавь тэг ``<router-view></router-view>`` — внутри этого тэга и будет происходить роутинг

6. На корневой странице(*компаненте*) создай ссылку на другую страницу тегом *router-link* с аттрибутом указывающим к какому компоненту переходим и какие параметры ему передаём ``:to="{name: 'cart', params: {cart_data: CART}}"``. На другой странице создай обратную ссылку

7. Для корректного подсчёта количества товара, чтобы не было NaN, добавь добавление свойства с количеством и единицей в *store.js* ``state.cart.push({ ...product, quantity: 1 })``

## Сумма итогов и изменениие количесва товара в корзине

1. Создай в компоненте корзины *v-cart* элемент с классом который будет отображать итоги на странице

2. Создай вычисляемое свойство в разделе *computed* которое будет собирать в массив произведение сумм и количесва каждого товара в корзине и потом всё это складывать и передай его интерполяцией в элемент корзины

3. Создай в компоненте товара в корзине *v-cart-item* элементы для добавления и уменьшения количества единиц товара *quantity*. Добавь им по событию на клик, которые должны отправлятся к родителю с помощью метода *$emit* и прими их в родительском компоненте с индексом в параметре

4. Создай в *store.js* экшены для добавления и удаления количества товара с переменной индекса ``DECREMENT_CART_ITEM({commit}, index) { commit('INCREMENT', index) }``. Cделай экшены доступными в компоненте *vue-cart* с помощь *mapAction* и добавь в методы которые выхываются по кликам по кнопка - и +

5. Создай мутации от экшена на изменения количества ``INCREMENT(state, index) { state.cart[index].quantity++ }``. В удалении проверь, чтобы количество не было меньше единицы

## Refactoring — best practices

1. Одинаковый префикс и смысловые названия компонентов

2. Имена компонентов в kebab-case, а при импорте camelCase ``import vCartItem from "@/components/v-cart-item";``

3. Всегда писать в props тип данных и что возвращает по умолчанию

```js
props: {
    cart_item_data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
```

4. Если у элемента больше одного атрибута, то записывать их в столбик

```html
<v-cart-item
      v-for="(item, index) in cart_data"
      :key="item.article"
      :cart_item_data="item"
      @deleteFromCart="deleteFromCart(index)"
      @decrement="decrement(index)"
      @increment="increment(index)"
    />
```

5. Boolean переменные начинать с *is* ``let isProductExists = false;``

6. Методы компонентов с маленькой буквы в camelCase, а действия(методы) Vuex в uppercase ``deleteFromCart(index) { this DELETE_FROM_CART(index); }``

7. Разделять *state*, *mutations*, *actions* и *getters* по отдельным папкам. Декомпозируй логически на файлы и импортируй объедения в *store.js* ``const actions = {...commonActions, ...apiRequest}``

8. Используй в компонентах *mapGetters* для получения и *mapActions* для работы с данными из *store*

```js
computed:{
    ...mapGetters([
      'PRODUCTS',
      'CART'
    ])
  },
methods: {
    ...mapActions([
      'GET_PRODUCTS_FROM_API',
      'ADD_TO_CART'
    ]),
  }
```

9. Объединяй родственные компоненты в папки. Проверь пути в *router.js*, а для статики испольщуй пути c *@*, что позволит писать от корня ``:src="require('@/assets/images/' + cart_item_data.image)"``

## Нативный select

1. Создай компонент для селекта *v-select*, ипортируй к компонент отображения, укажи в *components* и добавь его тег в нужно место html DOM

2. Создай в родительском компоненте массив опций селекта в *data* укажи их для передачи в аттрибуте ``<v-select :category="category" />`` и прими их в дочернем в *props*

3. Перебери и выведи содержимое массива ``<p v-for="option in category" :key="option.value">{{ option.name }}</p>``

4. Скрой список опций ``v-if="isOptionVisible"`` и меняй значение при клике на кнопку ``@click="isOptionVisible = !isOptionVisible"``

5. Добавь обработчик клика по опции в который передай аргументом всю опцию ``@click="selectOption(option)"`` и передай результат работы метода на верх ``selectOption(option) { this.$emit('select', option) }`` и прими в родительском для вызова метода сортировки ``@select="selectCategory"``

6. В методе *selectCategory* с переданным параметром *option* сделай фильтр массива *PRODUCTS* в массив *sortedProducts* с условием, что название категории в продукте соответствует переданной опции

```js
this.sortedProducts = this.PRODUCTS.filter(function(product) {
        return product.category === option.name
      })
```

7. Создай в *computed* вычисляемый массив результата фильтрации с проверкой, что если фильтрация содержит данные, то её использовать, если нет то возвращать *PRODUCTS* — по этому результату и выводи товары на странице

## Отслеживать изменения размера экрана в VUEX

1. В исходном компонете объяви переменные в *data*

```js
    windowWidth: 1200, // ширина экрана
    windowType: ''     // тип экрана
```

2. Опиши размеры и типы  в *mounted()*, чтобы сразу при его отрисовке использовались

```js
    function switchWindowType(ww) { // сопоставляем размеры и тип
      if (ww >= 1200) {
        return "Extra large";
      } else if (ww >= 992 && ww <= 1199) {
        return "Large";
      } else if (ww >= 768 && ww <= 991) {
        return "Medium";
      } else if (ww >= 576 && ww <= 767) {
        return "Small";
      } else {
        return "Extra small";
      }
    }
```

3. Опиши фунцию, которая будет присваивать значения переменным и вызывать экшен. Вызови её при загрузке странице и запиши вызов при каждом изменении размера окна

```js
   function listenWindowSize() { //функция, которая будет измерять экран
      vm.windowWidth = window.innerWidth;
      vm.windowType = switchWindowType(vm.windowWidth); //имея размер определяем тип через функцию, где сопаставлены размеры и тип
      vm.WINDOW_SIZE(vm.windowType); //обращаемся к экшену и передаём ему тип
    }

    listenWindowSize(); //сразу вызываем написанную выше фунцию

    window.addEventListener("resize", function() { //запускаем всегда слушать изменения размера окна
      listenWindowSize();
    });
```

4. импортируй ``import { mapActions } from "vuex";`` и подключи для использования экшен ``...mapActions(["WINDOW_SIZE"])``

5. Экшен приниает название типа окна и передаёт его в мутацию ``WINDOW_SIZE({commit}, size) { commit('CHANGE_WINDOW_SIZE', size) } ``

6. Мутация принимает экшен и изменяет *store* ``CHANGE_WINDOW_SIZE(state, size) { state.windowSize = size; }``

7. Выведи значение типа экрана в *getters* ``WINDOW_TYPE(state) { return state.windowSize; } ``, чтобы использовать его в компонентах, прим. ``<small>window size: {{ this.WINDOW_TYPE }}</small>``

## Ползунковый select — дополнительная сортировка

1. Создай в компоненте *v-catalog* два инпутами типа *range* и стилизуй, чтобы они были на одной линии, вынеси значения в *data()* из ползунков через ``v-model.number="minPrice"`` и следи за ним ``@mousemove="doNotCrosRange"``. 

2. Опиши метод слежения за ползунком, пока придума только это:

```js
doNotCrosRange() {
          if(this.minPrice + this.step >= this.maxPrice) {
              let tmpMin = this.minPrice;
              let tmpMax = this.maxPrice;
              this.maxPrice = tmpMin + this.step
              this.minPrice = tmpMax - this.step
          }
      }
```

3. В *selectCategory()* в первой очереди при создании компонента наполни массив сортированных продуктов из всего списка продуктов ``this.sortedProducts = [...this.PRODUCTS]``

4. 

## Модальное окно

1. Создай отдельныый компонент для модального окна и импортируй его в компонент товара.

2. Создай в товаре кнопку для управления свойством видимости компонента модального окна ``showInfo() { this.isInfoPopupVisible = !this.isInfoPopupVisible }`` и передавай из модального наверх вызов этого события по ликам кнопок самого окна

3. В модальном окне добавь тэги ``<slot></slot>`` чтобы передавать в это место из родителя элементы контента с сохранением html-структуры

4. Добавь в тэг затемнённой области модального окна атрибут, чтобы можно было обратиться конкретно к ней ``ref="popup_wrapper"``. Как только документ срендерился добавь слушать клики по этой области ``if (item.target === vm.$refs['popup_wrapper']){ vm.closePopup() }``

## Фильтры

1. Создай в директории *src* новую директорию для фильтров и в ней *.js* файла для конкретного фильтра, *прим. округлить число до 2 знаков:*

```js
export default function toFix(value){
    value = parseFloat(value);
    return value.toFixed(2);
}
```

2. Импортируй в компонент фильтр который хочешь использовать ``import toFix from "@/filters/toFix";`` и объяви его в объектах компонента ``filters: { toFix }`` — сюда подлючаться будут и другие фильтры

3. Добавь через вертикальный разделитель к переменной фильтр ``{{ product_data.category | toFix }}`` — следующий фильтр так же добавляй через вертикальный разделитель