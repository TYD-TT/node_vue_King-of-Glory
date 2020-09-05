import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router/router'
import http from './http.js'

Vue.config.productionTip = false

Vue.prototype.$http = http

Vue.mixin({
  methods: {
    getAuthHeaders(){
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  },
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
