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
          getTitle :  route => `Channel ${route.params.id} - Groupomania`,
          key : route => `UserProfile-${route.params.id}`,
          description : "Venez discutez, partagez, de manière informel avec l'ensemble de nos collègues"
        }
      }
    ],
    meta: { 
      requiresAuth: true,
      reload: true,
      title: 'Page d\'accueil - Groupomania',
      description : "Groupomnia Social Network est un moyen simple d'échange inter entreprise"
    }
  },
  {
    path: '/login',
    name: 'Login',
    meta: { 
      title: 'Login - Groupomania',
      description : "Groupomnia Social Network est un moyen simple d'échange inter entreprise"
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: { 
      title: 'Register - Groupomania',
      description : "Groupomnia Social Network est un moyen simple d'échange inter entreprise"
    },
    component: () => import('../views/Register.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
