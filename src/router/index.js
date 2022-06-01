import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue')
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