import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'
import router from './router/router'

import './assets/styles/styles.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
