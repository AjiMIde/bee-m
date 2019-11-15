import Vue from 'vue'
import App from './App.vue'
import router from './router'
import dialogPlugin from './libs/beePlugin/dialogPlugin'

Vue.config.productionTip = false
Vue.use(dialogPlugin)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
