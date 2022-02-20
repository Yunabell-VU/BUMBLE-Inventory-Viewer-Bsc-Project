import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/main',
    name: 'Home',
    component: () => import('../pages/Home.vue')
  }, {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router