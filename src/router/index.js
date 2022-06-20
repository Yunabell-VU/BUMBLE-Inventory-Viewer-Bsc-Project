import { createRouter, createWebHashHistory } from 'vue-router'
import Models from '../components/board/Models.vue'
import Model from '../components/board/Model.vue'
import Inventory from '../components/board/Inventory.vue'
import Sessions from '../components/board/Sessions.vue'
import Languages from '../components/board/Languages.vue'
import Users from '../components/board/Users.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue'),
    redirect:'/models',
    children: [
      {
        path:'/models',
        name: 'Models',
        component: Models,
      },
      {
        path:'/models/:modelName',
        name: 'Model',
        component: Model,
      },
      {
        path:'/inventory',
        name: 'Inventory',
        component: Inventory
      },
      {
        path:'/sessions',
        name: 'Sessions',
        component: Sessions
      },
      {
        path:'/languages',
        name: 'Languages',
        component: Languages
      },
      {
        path:'/users',
        name: 'Users',
        component: Users
      },
    ]

  }, {
    path: '/register',
    name: 'Register',
    component: () => import('../pages/Register.vue'),
    beforeEnter(to, from, next) {
      const {isLogin} = localStorage;
      isLogin ? next({name: 'Home'}): next();
    }
  }, {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login.vue'),
    beforeEnter(to, from, next) {
      const {isLogin, userID} = localStorage;
      (isLogin && userID) ? next({name: 'Home'}): next();
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// TODO: Need to verify if userID exists
router.beforeEach((to, from, next)=>{
  const {isLogin, userID} = localStorage;
  ((isLogin && userID)|| to.name === "Login" || to.name === "Register") ? next(): next({name: 'Login'});
})

export default router