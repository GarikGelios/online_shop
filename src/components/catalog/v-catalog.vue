<template>
  <div class="v-catalog">
    <router-link :to="{name: 'cart', params: {cart_data: CART}}">
      <div class="v-catalog__link_to_cart">Cart: {{ CART.length }}</div>
    </router-link>
    <h2>Catalog</h2>

    <v-select
      :category="category"
      @select="selectCategory"
      :selected="selected"
    />
    <p v-if="selected != 'Select ▼'">Selected is: {{ selected }}</p>

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

import {mapActions, mapGetters} from 'vuex'

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
        { name: "Мужские", value: 'm' },
        { name: "Женские", value: 'w' },
        { name: "Все", value: 'all' },
      ],
      selected: 'Select ▼',
      sortedProducts: []
    };
  },
  computed:{
    ...mapGetters([
      'PRODUCTS',
      'CART'
    ]),
    sortedProductsFinal() {
      if (this.sortedProducts.length) {
        return this.sortedProducts
      } else {
        return this.PRODUCTS
      }
    }
  },
  methods: {
    ...mapActions([
      'GET_PRODUCTS_FROM_API',
      'ADD_TO_CART'
    ]),
    addToCart(data) {
      this.ADD_TO_CART(data)
    },
    selectCategory(option) {
      this.selected = option.name;
      this.sortedProducts = this.PRODUCTS.filter(function(product) {
        return product.category === option.name
      })
    }
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API()
    .then((response) => {  //далее ответ
      if (response.data) { //проверь на наличие содержимого
        console.log('Data arrived!') //если ок, напиши, что всё пришло
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