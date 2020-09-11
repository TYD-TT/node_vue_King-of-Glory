import Vue from 'vue'
import App from './App.vue'
import './assets/scss/style.scss'
import router from './router/router'

// 字体图标
import './assets/iconfont/iconfont.css'

// 轮播图片
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
 
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

import Card from './components/Card.vue'
Vue.component('m-card',Card)

import ListCard from './components/ListCard.vue'
Vue.component('m-list-card',ListCard)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
