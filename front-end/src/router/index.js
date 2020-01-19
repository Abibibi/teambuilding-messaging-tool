import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Spaces from '@/views/Spaces.vue'
import ReceivedMessages from '@/views/ReceivedMessages.vue'
import SentMessages from '@/views/SentMessages.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      requiresVisitor: true
    },
    component: Home
  },
  {
    path: '/inscription',
    name: 'register',
    meta: {
      requiresVisitor: true
    },
    component: Register
  },
  {
    path: '/connexion',
    name: 'login',
    meta: {
      requiresVisitor: true
    },
    component: Login
  },
  {
    path: '/espaces',
    name: 'spaces',
    meta: {
      requiresAuth: true
    },
    component: Spaces
  },
  {
    path: '/messages-recus',
    name: 'received-messages',
    meta: {
      requiresAuth: true
    },
    component: ReceivedMessages
  },
  {
    path: '/messages-envoyes',
    name: 'sent-messages',
    meta: {
      requiresAuth: true
    },
    component: SentMessages
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/* router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.state.logged) {
      next({
        name: 'welcome'
      })
    } else {
      next()
    }
  } else {
    next()
  }
}) */

export default router
