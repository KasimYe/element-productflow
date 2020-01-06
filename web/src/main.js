import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

Vue.config.productionTip = false

import http from './http'
Vue.prototype.$http=http
import conf from './conf'
Vue.prototype.$wxcof=conf

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
