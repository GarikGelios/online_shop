<template>
  <div class="v-catalog-item">
    <v-popup
      v-if="isInfoPopupVisible"
      @closePopup="closeInfoPopup"
      @rightBtnAction="addToCart"
      rightBtntitle="Add to cart"
      :popupBtntitle='product_data.name'
    >
    <!-- содержимое slot -->
    <div>
      <img :src="require('@/assets/images/' + product_data.image)" alt="img" />
      <p class="v-catalog-item__name">{{ product_data.name }}</p>
      <p class="v-catalog-item__price">Price: {{ Math.round(product_data.price) }}</p>
      <p class="v-catalog-item__price">{{ product_data.category }}</p>
    </div>
    </v-popup>

    <img :src="require('@/assets/images/' + product_data.image)" alt="img" />
    <p class="v-catalog-item__name">{{ product_data.name }}</p>
    <p class="v-catalog-item__price">Price: {{ Math.round(product_data.price) }}</p>

    <div class="btm_group">
      <button class="v-catalog-item__show_info btn" @click="showInfo">Show info</button>
      <button class="v-catalog-item__add_to_cart_btn btn" @click="addToCart">Add to cart</button>
    </div>
  </div>
</template>

<script>
import vPopup from "@/components/popup/v-popup";

export default {
  name: "v-catalog-item",
  components: {
    vPopup
  },
  props: {
    product_data: {
      type: Object,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isInfoPopupVisible: false
    }
  },
  methods: {
    addToCart() {
      this.$emit("addToCart", this.product_data);
    },
    showInfo() {
      this.isInfoPopupVisible = !this.isInfoPopupVisible
    },
    closeInfoPopup() {
      this.showInfo()
    }
  }
};
</script>

<style lang="scss">
.v-catalog-item {
  flex-basis: 25%;
  box-shadow: 0 0 8px 0 #e0e0e0;
  padding: $padding * 2;
  margin-bottom: $margin * 2;
}
.btm_group {
  display: flex;
  justify-content: space-between;
}
</style>