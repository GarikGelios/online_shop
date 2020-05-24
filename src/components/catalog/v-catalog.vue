<template>
  <div class="v-catalog">
    <router-link :to="{name: 'cart', params: {cart_data: CART}}">
      <div class="v-catalog__link_to_cart">Cart: {{ CART.length }}</div>
    </router-link>
    <h2>Catalog</h2>

    <small>window size: {{ this.WINDOW_TYPE }}</small>

    <v-select :category="category" @select="selectCategory" :selected="selected" />
    <p v-if="selected != 'Select ▼'">Selected is: {{ selected }}</p>

    <v-range @sortedProductsPrice="dataSortedProductsPrice"/>

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
import vRange from "./../v-range";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "v-catalog",
  components: {
    vCatalogItem,
    vSelect,
    vRange
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
      sortedProducts: [],
      sortedProductsPrice: []
    };
  },
  computed: {
    ...mapGetters(["PRODUCTS", "CART", "WINDOW_TYPE"]),
    sortedProductsFinal() {

     


      if (this.sortedProducts.length) {
        return this.sortedProducts;
      } else if (this.sortedProductsPrice.length) {
        return this.sortedProductsPrice
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
    selectCategory(option) {
      let vm = this;

      this.selected = option.name;
      this.sortedProducts = this.PRODUCTS.filter(function(product) {
        if (option.value != "all") {
          return product.category === option.name  && vm.sortedProductsPrice.includes(product)
        } else {
          return vm.sortedProductsPrice.includes(product);
        }
      });
    },
    dataSortedProductsPrice(data) {
      this.sortedProductsPrice = data;
    }
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API().then(response => {
      //далее ответ
      if (response.data) {
        //проверь на наличие содержимого
        console.log("Data arrived!"); //если ок, напиши, что всё пришло
      }
    })
  }
};
</script>

<style lang="scss">
.v-catalog {
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
</style>