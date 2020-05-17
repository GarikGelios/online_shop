<template>
  <div class="v-cart">
    <h3>Cart</h3>
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