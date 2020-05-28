<template>
  <div class="popup_wrapper" ref="popup_wrapper">
      <div class="v-popup">
    <div class="v-popup__header">
      <span>{{ popupBtntitle }}</span>
      <span
      @click="closePopup"
      >X</span>
    </div>
    <div class="v-popup__content">
      <slot></slot>
    </div>
    <div class="v-popup__footer">
        <button class="btn" @click="closePopup">Close</button>
        <button class="btn" @click="rightBtnAction">{{ rightBtntitle }}</button>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "v-popup",
  props: {
      rightBtntitle: {
          type: String,
          default: 'OK'
      },
      popupBtntitle: {
          type: String,
          default: 'Popup name'
      }
  },
  data() {
    return {};
  },
  methods: {
      closePopup() {
          this.$emit('closePopup')
      },
      rightBtnAction() {
          this.$emit('rightBtnAction')
      }
  },
  mounted() {
      let vm = this;
       document.addEventListener('click', function(item){
           if (item.target === vm.$refs['popup_wrapper']){
               vm.closePopup()
           }
       })
  },
  computed: {}
};
</script>

<style lang="scss">
.popup_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba($color: #646464, $alpha: .4);  
}
.v-popup {
  padding: $padding * 2;
  position: fixed;
  top: 50px;
  width: 400px;
  background: white;
  z-index: 10;
  &__header,
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>