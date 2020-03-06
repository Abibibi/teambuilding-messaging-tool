import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/sass/index.sass'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUserPlus,
  faSignInAlt,
  faUsers,
  faFolderPlus,
  faSignOutAlt,
  faPaperPlane,
  faComment
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faUserPlus,
  faSignInAlt,
  faUsers,
  faFolderPlus,
  faSignOutAlt,
  faPaperPlane,
  faComment
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
