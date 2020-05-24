<template>
  <aside class="v-range">
    <span>{{ minPrice }}</span>
    <div class="v-range__input">
      <input type="range" min="0" max="990" :step="step"
      v-model.number="minPrice"
      @mousemove="doNotCrosRange"
      />
      <input type="range" min="10" max="1000" :step="step"
      v-model.number="maxPrice"
      @mousemove="doNotCrosRange"
      />
    </div>
    <span>{{ maxPrice }}</span>
  </aside>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "v-range",
  data() {
    return {
      minPrice: 0,
      maxPrice: 1000,
      step: 10,
      sortedProductsPrice: []
    };
  },
  computed: {
      ...mapGetters([
      'PRODUCTS'
    ]),
  },
  methods: {
      doNotCrosRange() {
          if(this.minPrice + this.step >= this.maxPrice) {
              let tmpMin = this.minPrice;
              let tmpMax = this.maxPrice;
              
              this.maxPrice = tmpMin + this.step
              this.minPrice = tmpMax - this.step
          }
          this.sortByPrice();
      },
      sortByPrice() {
          let vm = this;
          this.sortedProductsPrice = this.PRODUCTS.filter(function(product) {
              return product.price >= vm.minPrice && product.price <= vm.maxPrice
          })
          this.$emit('sortedProductsPrice', this.sortedProductsPrice)
      }
  },
  mounted() {}
};
</script>

<style lang="scss">
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