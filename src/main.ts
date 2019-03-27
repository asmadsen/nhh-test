import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
// @ts-ignore
import { apollo } from '@/vue-apollo'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  // @ts-ignore
  apolloProvider: apollo,
  render: h => h(App)
}).$mount('#app')
