<template>
  <div class="v-cart-item">
    <img class="v-cart-item__img" :src="require('../assets/images/' + cart_item_data.image)" alt />
    <div class="cart_item_info">
      <p>{{cart_item_data.name}}</p>
      <p>{{cart_item_data.price}}</p>
      <p>{{cart_item_data.article}}</p>
    </div>
    <div class="v-cart-item__quantity"></div>
    <button>Delete</button>
  </div>
</template>

<script>
export default {
  name: "v-cart-item",
  props: {
    cart_item_data: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style lang="scss">
.v-cart-item {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 8px 0 #e0e0e0;
  padding: $padding * 2;
  margin-bottom: $margin * 2;

  &__img {
      width: 100px;
  }
}
</style>