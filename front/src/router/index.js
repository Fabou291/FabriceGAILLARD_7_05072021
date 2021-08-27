import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Channel from '../views/Channel.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path: 'channel/:id',
        name: 'Channel',
        component : Channel,
        meta : {
          key : route => `UserProfile-${route.params.id}`
        }
      }
    ],
    meta: { requiresAuth: true, reload: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
