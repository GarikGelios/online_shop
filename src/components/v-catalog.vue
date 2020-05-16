<template>
  <div class="v-catalog">
      <h2>Catalog</h2>
      <v-catalog-item />
  </div>
</template>

<script>
import vCatalogItem from "@/components/v-catalog-item";

export default {
    name: "v-catalog",
    components: {
        vCatalogItem
    }

}
</script>

<style>

</style>