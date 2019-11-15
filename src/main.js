import Vue from 'vue'
import App from './App.vue'
import router from './router'
import toastPlugin from './libs/beePlugin/toastPlugin'

Vue.config.productionTip = false
Vue.use(toastPlugin)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
