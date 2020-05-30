<template>
  <div class="v-main-wrapper">
    <v-header/>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import vHeader from '@/components/layouts/v-header'

export default {
  name: "v-main-wrapper", //название компонента
  props: {}, //свойства из других компонентов
  data() { //переменные свойства внутри компонента
    return {
      //обязательно возвращать
    }
  },
  components: {
    vHeader
  },
  computed: {}, //вычисляемые свойства
  methods: {
    //методы, различные действия внутри компонента
    
  },
  watch: {} //наблюдения за изменениями свойств и вызов каких-либо методов
};
</script>

<style>
main {
  margin-top: 70px;
}
.v-main-wrapper {
  max-width: 900px;
  margin: 0 auto;
}
</style>