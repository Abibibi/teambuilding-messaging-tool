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
import notFound from '@/views/404.vue'
import axios from 'axios'
import store from '@/store'

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
    path: '/accepter-espace/:espace',
    name: 'accept-space',
    meta: {
      requiresSpaces: true
    },
    component: AcceptSpace
  },
  {
    path: '/confirmation-adhesion/:espace',
    name: 'confirmed-space',
    meta: {
      requiresAuth: true,
      requiresSpaces: true
    },
    component: ConfirmedSpace
  },
  {
    path: '/:espace/messages-recus',
    name: 'received-messages',
    meta: {
      requiresAuth: true,
      requiresSpaces: true
    },
    component: ReceivedMessages
  },
  {
    path: '/:espace/messages-envoyes',
    name: 'sent-messages',
    meta: {
      requiresAuth: true,
      requiresSpaces: true
    },
    component: SentMessages
  },
  {
    path: '/:espace/envoyer-message',
    name: 'send-message',
    meta: {
      requiresAuth: true,
      requiresSpaces: true
    },
    component: SendMessage
  },
  {
    path: '*',
    name: 'not-found',
    component: notFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  axios.get('http://localhost:5000/spaces/allSpaces', { withCredentials: true })
    .then((response) => {
      console.log(response)
      // this allows to put response.data
      // in the spaces key, in the state
      store.commit('allSpacesReceived', response.data)
    })

  axios.get('http://localhost:5000/users/isAuth', { withCredentials: true })
    .then((response) => {
      // tons of console.log
      // to understand in which order
      // tasks are executed in beforeEach router function
      console.log(response)
      store.commit('alreadyAuthenticated', response.data)
      console.log('test-axios-ok')
      console.log('is logged true? ' + store.state.logged)

      if (to.matched.some(record => record.meta.requiresVisitor)) {
        next({
          name: 'my-spaces'
        })
      } if (store.state.logged && to.matched.some(record => record.meta.requiresSpaces)) {
        const spaces = store.state.spaces
        console.log(spaces)
        console.log(to.params.espace)
        // to make sure that when a user tries to access
        // a page with a space name in the URL (as a param),
        // the space name actually matches one of the space name
        // in the state (thus the database):
        const oneSpace = spaces.find((singleSpace) => singleSpace.name === to.params.espace)
        console.log(oneSpace)

        if (oneSpace) {
          next()
          console.log('onespacename exists')
        } else {
          // if the space name param in the URL
          // does not match any actual space names (contained in the state),
          // user is redirected to 404 page
          next({ name: 'not-found' })
          console.log('onespacename does not exist')
        }
      } else {
        next()
      }
    })
    .catch(() => {
      store.commit('notAuthenticated')
      console.log('is logged false?: ' + store.state.logged)
      if (to.matched.some(record => record.meta.requiresAuth)) {
        next({
          name: 'home'
        })
      } else if (!store.state.logged && to.matched.some(record => record.meta.requiresSpaces)) {
        const spaces = store.state.spaces
        console.log(spaces)
        const oneSpace = spaces.find((singleSpace) => singleSpace.name === to.params.espace)
        console.log(oneSpace)

        if (oneSpace) {
          next()
          console.log('onespacename exists')
        } else {
          next({ name: 'not-found' })
          console.log('onespacename does not exist')
        }
      } else {
        next()
      }
    })
})

export default router
