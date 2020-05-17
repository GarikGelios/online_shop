<template>
  <div class="v-catalog">
    <h2>Catalog</h2>
    <div class="v-catalog__list">
      <v-catalog-item 
        v-for="product in PRODUCTS"
        :key="product.article"
        :product_data="product"
        @sendArticle="showChildArticleInConsole"
      />
    </div>
  </div>
</template>

<script>
import vCatalogItem from "@/components/v-catalog-item";
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "v-catalog",
  components: {
    vCatalogItem
  },
  props: {},
  data() {
    return {
    };
  },
  computed:{
    ...mapGetters([
      'PRODUCTS'
    ])
  },
  methods: {
    ...mapActions([
      'GET_PRODUCTS_FROM_API'
    ]),
    showChildArticleInConsole(data) {
      console.log(data);
    }
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API()
    .then((response) => {  //далее ответ
      if (response.data) { //проверь на наличие содержимого
        console.log('Data arrived!') //если ок, напиши, что всё пришло
      }
    })
  }

};
</script>

<style lang="scss">
.v-catalog {
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
}
</style>