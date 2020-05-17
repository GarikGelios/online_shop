<template>
  <div class="v-main-wrapper">
      <p>{{title}}</p>
      <v-catalog />
      <v-cart 
        v-if="CART.length //если в корзине 0 товаров, то он не отобразится
        "
        :cart_data="CART" 
        
        />
  </div>
</template>

<script>
import vCatalog from '@/components/v-catalog';
import vCart from "@/components/v-cart";
import { mapGetters } from 'vuex'

export default {
    name: "v-main-wrapper", //название компонента
    components: { //подключенные внешние компоненты
        vCatalog,
        vCart
    },
    props: { //свойства из других компонентов
    }, 
    data () { //переменные свойства внутри компонента
        return { //обязательно возвращать
            title: "Main wrapper"
        }
    },
    computed:{ //вычисляемые свойства
        ...mapGetters([
            'CART'
        ])
    }, 
    methods: {}, //методы, различные действия внутри компонента
    watch: {}, //наблюдения за изменениями свойств и вызов каких-либо методов


}
</script>

<style>
.v-main-wrapper {
    max-width: 900px;
    margin: 0 auto;
}

</style>