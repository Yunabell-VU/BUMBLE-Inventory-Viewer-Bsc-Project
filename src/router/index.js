import { createRouter, createWebHashHistory } from 'vue-router'
import Inventory from '../components/board/Inventory.vue'
import InventoryStructure from '../components/board/inventory/InventoryStructure.vue'
import Models from '../components/board/Models.vue'
import Sessions from '../components/board/Sessions.vue'
import Languages from '../components/board/Languages.vue'
import Users from '../components/board/Users.vue'
import Library from '../components/board/Library.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue'),
    redirect:'/inventory',
    children: [
      {
        path:'/inventory',
        name: 'Inventory',
        component: Inventory
      },
      {
        path:'/inventory/structure',
        name: 'InventoryStructure',
        component: InventoryStructure,
      },
      {
        path:'/models',
        name: 'Models',
        component: Models,
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
      {
        path:'/library',
        name: 'Library',
        component: Library
      }
    ]
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
  ((isLogin && userID)|| to.name === "Login") ? next(): next({name: 'Login'});
})

export default router