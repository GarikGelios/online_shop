<template>
  <div class="v-main-page">
    <h1>{{title}}</h1>
    <router-link :to="{name: 'catalog'}">
        to Catalog
    </router-link>
  </div>
</template>

<script>
export default {
  name: "v-main-page",
  data() { //переменные свойства внутри компонента
    return {
      //обязательно возвращать
      title: "My online-shop",
    }
  },
};
</script>

<style lang="scss">

</style>