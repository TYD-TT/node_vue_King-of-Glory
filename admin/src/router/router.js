import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../views/Main.vue'

import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import CategoryListCopy from '../views/CategoryListCopy.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoryEdit },
      { path: '/categories/edit/:id', component: CategoryEdit, props: true },
      { path: '/categories/list', component: CategoryList },
      { path: '/categories/list1', component: CategoryListCopy }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
