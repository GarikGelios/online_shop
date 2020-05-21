<template>
  <div class="v-cart">
    <router-link :to="{name: 'catalog'}">
      <div class="v-catalog__link_to_cart">Back to catalog</div>
    </router-link>
    <h2>Cart</h2>
    <p v-if="!cart_data.length">There are no products in cart ...</p>
    <v-cart-item 
      v-for="(item, index) in cart_data"
      :key="item.article"
      :cart_item_data="item"
      @deleteFromCart="deleteFromCart(index)"
    />
  </div>
</template>

<script>
import vCartItem from "@/components/v-cart-item";
import {mapActions} from 'vuex'

export default {
  name: "v-cart",
  props: {
    cart_data: { //встречаем из родителя элемент
            type: Array, //это будет массив
            default() {
                return [] //изначально пустой
            }
        }
  } ,
  components: {
    vCartItem
  },
  methods: {
    ...mapActions([
      'DELETE_FROM_CART'
    ]),
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index)
    }
  }
};
</script>

<style>
</style>