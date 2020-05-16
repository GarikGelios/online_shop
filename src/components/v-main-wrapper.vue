<template>
  <div class="v-main-wrapper">
      <p>{{title}}</p>
      <v-catalog />
      <v-cart />
  </div>
</template>

<script>
import vCatalog from '@/components/v-catalog';
import vCart from "@/components/v-cart";

export default {
    name: "v-main-wrapper", //название компонента
    components: { //подключенные внешние компоненты
        vCatalog,
        vCart
    },
    props: {}, //свойства из других компонентов
    data () { //переменные свойства внутри компонента
        return { //обязательно возвращать
            title: "Main wrapper"
        }
    },
    computed:{}, //вычисляемые свойства
    methods: {}, //методы, различные действия внутри компонента
    watch: {}, //наблюдения за изменениями свойств и вызов каких-либо методов
    mounted: {
        // console.log('Hello world')
    }

}
</script>

<style>
.v-main-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    max-width: 900px;
    margin: 0 auto;
}

</style>