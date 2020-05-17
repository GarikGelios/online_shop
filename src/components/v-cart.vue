<template>
  <div class="v-cart">
    <h3>Cart</h3>
    <v-cart-item 
      v-for="item in cart_data"
      :key="item.article"
      :cart_item_data="item"
    />
  </div>
</template>

<script>
import vCartItem from "@/components/v-cart-item";

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
  }
};
</script>

<style>
</style>