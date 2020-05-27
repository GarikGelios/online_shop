<template>
  <div class="v-catalog">
    <router-link :to="{name: 'cart', params: {cart_data: CART}}">
      <div class="v-catalog__link_to_cart">Cart: {{ CART.length }}</div>
    </router-link>
    <h2>Catalog</h2>

    <small>window size: {{ this.WINDOW_TYPE }}</small>

    <aside>
      <v-select :category="category" @select="selectCategory" :selected="selected" />

      <div class="v-range">
        <span>{{ minPrice }}</span>
        <div class="v-range__input">
          <input
            type="range"
            min="0"
            max="990"
            :step="step"
            v-model.number="minPrice"
            @mousemove="doNotCrosRange"
          />
          <input
            type="range"
            min="10"
            max="1000"
            :step="step"
            v-model.number="maxPrice"
            @mousemove="doNotCrosRange"
          />
        </div>
        <span>{{ maxPrice }}</span>
      </div>
    </aside>

    <div class="v-catalog__list">
      <v-catalog-item
        v-for="product in sortedProductsFinal"
        :key="product.article"
        :product_data="product"
        @addToCart="addToCart"
      />
    </div>
  </div>
</template>

<script>
import vCatalogItem from "@/components/catalog/v-catalog-item";
import vSelect from "./../v-select";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "v-catalog",
  components: {
    vCatalogItem,
    vSelect
  },
  props: {},
  data() {
    //переменные свойства внутри компонента
    return {
      //обязательно возвращать
      category: [
        { name: "Мужские", value: "m" },
        { name: "Женские", value: "w" },
        { name: "Все", value: "all" }
      ],
      selected: "Select ▼",
      minPrice: 0,
      maxPrice: 1000,
      step: 10,
      sortedProducts: []
    };
  },
  computed: {
    ...mapGetters(["PRODUCTS", "CART", "WINDOW_TYPE"]),
    sortedProductsFinal() {
      if (this.sortedProducts.length) {
        return this.sortedProducts;
      } else {
        return this.PRODUCTS;
      }
    }
  },
  methods: {
    ...mapActions(["GET_PRODUCTS_FROM_API", "ADD_TO_CART"]),
    addToCart(data) {
      this.ADD_TO_CART(data);
    },

    doNotCrosRange() {
      if (this.minPrice + this.step >= this.maxPrice) {
        let tmpMin = this.minPrice;
        let tmpMax = this.maxPrice;

        this.maxPrice = tmpMin + this.step;
        this.minPrice = tmpMax - this.step;
      }
      this.selectCategory();
    },

    selectCategory(option) {
      let vm = this;
      this.sortedProducts = [...this.PRODUCTS];

      this.sortedProducts = this.sortedProducts.filter(function(product) {
        return product.price >= vm.minPrice && product.price <= vm.maxPrice;
      });
      if (option) { //если в опции что-то есть, то перебери массим сортированных продуктов
        this.sortedProducts = this.sortedProducts.filter(function(product) {
          vm.selected = option.name;
          return product.category === option.name;
        });
      }
    }
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API().then(response => {
      //далее ответ
      if (response.data) {
        //проверь на наличие содержимого
        console.log("Data arrived!"); //если ок, напиши, что всё пришло
        this.selectCategory(); //сразу вызываем функцию сортировки
      }
    });
  }
};
</script>

<style lang="scss">
.v-catalog {
  aside {
    display: flex;
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }
  &__link_to_cart {
    position: absolute;
    top: 10px;
    right: 10px;
    @include paddindBorder;
  }
}
.v-range {
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    width: 50px;
    padding: 5px;
  }
  &__input {
    position: relative;
    margin: $margin * 2;
    width: 350px;
    height: 10px;
    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      outline: none;
      height: 48px;
      margin: 0;
      padding: 0;
      border-radius: 8px;
      &[type="range"] {
        background-color: darkseagreen;
        height: 10px;
        -webkit-appearance: none;
      }
      &::-webkit-slider-thumb {
        pointer-events: all;
        position: relative;
        z-index: 1;
        outline: 0;
        -webkit-appearance: none;
        height: 24px;
        width: 24px;
        border-radius: 12px;
        background-color: #fff;
        box-shadow: 0 0 5px 1px #ccc;
        cursor: pointer;
      }
    }
  }
}
</style>