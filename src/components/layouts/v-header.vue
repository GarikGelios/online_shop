<template>
  <div class="v-header">
    <router-link :to="{name: 'mainPage'}">
      <img src="@/assets/logo.png" alt="logo" />
    </router-link>
    <div class="search-feald">
      <input type="text" v-model="searchValue" />
      <button @click="search(searchValue)">Serch</button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "v-header",
  data() {
    return {
      searchValue: ""
    };
  },
  computed: {
      ...mapGetters([
          'SEARCH_VALUE'
      ])
  },
  methods: {
      ...mapActions ([
          'GET_SEARCH_VALUE'
      ]),
      search(value) {
          this.GET_SEARCH_VALUE(value) //отправляем данные в экшен
          if (this.$route.path !== 'catalog') { //проверяем, не находимся ли мы на странице каталога
              this.$router.push('/catalog') //перенаправляем на страницк каталога
          }
          
      }
  }
};
</script>

<style lang="scss">
.v-header {
  display: flex;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  justify-content: space-around;
  align-items: center;
  background: darkseagreen;
  padding: $padding;
  img {
    width: 50px;
  }
  .search-feald {
    padding: $padding $padding * 4;
  }
}
</style>