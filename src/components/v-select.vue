<template>
  <aside class="v-select">
    <p @click="isOptionVisible = !isOptionVisible">{{ selected }}</p>
    <div v-if="isOptionVisible">
      <p
        v-for="option in category"
        :key="option.value"
        @click="selectOption(option)"
      >{{ option.name }}</p>
    </div>
  </aside>
</template>

<script>
export default {
  name: "v-select",
  props: {
    category: {
      type: Array,
      default() {
        return [];
      }
    },
    selected: {
        type: String,
        default: ''
    }
  },
  data() {
    return {
      isOptionVisible: false
    };
  },
  methods: {
    selectOption(option) {
      this.$emit("select", option);
      this.isOptionVisible = false;
    },
    hideSelected() {
        this.isOptionVisible = false;
    }

  },
  mounted() {
      document.addEventListener('click', this.hideSelected.bind(this), true)
  },
  beforeDestroy() {
      document.removeEventListener('click', this.hideSelected)
  }
};
</script>

<style lang="scss">
.v-select {
  cursor: pointer;
  margin-bottom: $margin*2;
  @include paddindBorder;
  p {
    padding: 5px 0;
    margin: 0;
  }
  div p {
    &:hover {
      @include shadow;
    }
  }
}
</style>