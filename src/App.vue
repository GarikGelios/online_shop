<template>
  <div id="app">
    <v-main-wrapper />
  </div>
</template>

<script>
import vMainWrapper from "./components/v-main-wrapper";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    vMainWrapper
  },
  data() {
    return {
      windowWidth: 1200, // ширина экрана
      windowType: ''     // тип экрана
    }
  },
  methods: {
    ...mapActions(["WINDOW_SIZE"])
  },
  mounted() {
    let vm = this;   // для общего контекста, чтобы использовать его внутри функций

    function switchWindowType(ww) { // сопоставляем размеры и тип
      if (ww >= 1200) {
        return "Extra large";
      } else if (ww >= 992 && ww <= 1199) {
        return "Large";
      } else if (ww >= 768 && ww <= 991) {
        return "Medium";
      } else if (ww >= 576 && ww <= 767) {
        return "Small";
      } else {
        return "Extra small";
      }
    }

    function listenWindowSize() { //функция, которая будет измерять экран
      vm.windowWidth = window.innerWidth;
      vm.windowType = switchWindowType(vm.windowWidth); //имея размер определяем тип через функцию, где сопаставлены размеры и тип
      vm.WINDOW_SIZE(vm.windowType); //обращаемся к экшену и передаём ему тип
      // console.log(
      //   "Window width is: " + windowWidth + "px and it is " + windowType
      // );
    }

    listenWindowSize(); //сразу вызываем написанную выше фунцию

    window.addEventListener("resize", function() { //запускаем всегда слушать изменения размера окна
      listenWindowSize();
    });

    
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
