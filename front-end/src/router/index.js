import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Spaces from '@/views/Spaces.vue'
import CreateSpace from '@/views/CreateSpace.vue'
import AcceptSpace from '@/views/AcceptSpace.vue'
import ConfirmedSpace from '@/views/ConfirmedSpace.vue'
import ReceivedMessages from '@/views/ReceivedMessages.vue'
import SentMessages from '@/views/SentMessages.vue'
import SendMessage from '@/views/SendMessage.vue'

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
    path: '/mes-espaces',
    name: 'my-spaces',
    meta: {
      requiresAuth: true
    },
    component: Spaces
  },
  {
    path: '/creer-un-espace',
    name: 'create-space',
    meta: {
      requiresAuth: true
    },
    component: CreateSpace
  },
  {
    path: '/accepter-espace-:espace',
    name: 'accept-space',
    component: AcceptSpace
  },
  {
    path: '/confirmation-adhesion-:espace',
    name: 'confirmed-space',
    meta: {
      requiresAuth: true
    },
    component: ConfirmedSpace
  },
  {
    path: '/:espace/messages-recus',
    name: 'received-messages',
    meta: {
      requiresAuth: true
    },
    component: ReceivedMessages
  },
  {
    path: '/:espace/messages-envoyes',
    name: 'sent-messages',
    meta: {
      requiresAuth: true
    },
    component: SentMessages
  },
  {
    path: '/:espace/envoyer-message',
    name: 'send-message',
    meta: {
      requiresAuth: true
    },
    component: SendMessage
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
