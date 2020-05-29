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
      @decrement="decrement(index)"
      @increment="increment(index)"
    />
    <div class="v-cart__total">
      <p>Total:</p>
      <p class="v-cart__total_coast">{{ cartTotalCoast | toFix | formattedPrice }}</p>
    </div>
  </div>
</template>

<script>
import vCartItem from "@/components/cart/v-cart-item";
import toFix from "@/filters/toFix";
import formattedPrice from "@/filters/price-format";
import { mapActions } from "vuex";

export default {
  name: "v-cart",
  props: {
    cart_data: {
      //встречаем из родителя элемент
      type: Array, //это будет массив
      default() {
        return []; //изначально пустой
      }
    }
  },
  computed: {
    //создаём вычесляемые свойства
    cartTotalCoast() {
      //сумма итогов в карзине
      let result = []; //массив для произведения стоимости идиницы и количества каждого товара в корзине
      let resultSum;

      for (let item of this.cart_data) {
        //перебираем массив cart_data переданный в props
        result.push(item.price * item.quantity); //вот оно произведение и мы его пушим в массив
      }
      if (result.length) { //проверяем, чтобы не пустой массив перебирать, 0 это false
        resultSum = result.reduce(function(sum, el) {
          //метод аккумулятор собирает и присваивает resultSum
          return sum + el; //прибавление каждого следующего el из массива в summ
        });
        return Math.round(resultSum); //возращаем как искомую сумму фунции
      } else {
        return 0
      }

      
    }
  },
  components: {
    vCartItem
  },
  filters: {
    toFix,
    formattedPrice
  },
  methods: {
    ...mapActions([
      "DELETE_FROM_CART",
      'DECREMENT_CART_ITEM',
      'INCREMENT_CART_ITEM'
      ]),
      decrement(index) {
        this.DECREMENT_CART_ITEM(index)
      },
      increment(index) {
        this.INCREMENT_CART_ITEM(index)
      },

    deleteFromCart(index) {
      this.DELETE_FROM_CART(index);
    }
  }
};
</script>

<style lang="scss">
.v-cart {
  &__total {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    padding: $padding * 2;
    display: flex;
    justify-content: center;
    background: darkseagreen;
    color: #ffffff;
    font-size: 20px;
    &_coast {
      padding-left: 20px;
      font-weight: 700;
    }
  }
}
</style>