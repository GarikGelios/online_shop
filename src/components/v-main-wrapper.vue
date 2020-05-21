<template>
  <div class="v-main-wrapper">
      <h1>{{title}}</h1>
      <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: "v-main-wrapper", //название компонента
    props: {}, //свойства из других компонентов
    data () { //переменные свойства внутри компонента
        return { //обязательно возвращать
            title: "My online-shop"
        }
    },
    computed:{}, //вычисляемые свойства
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