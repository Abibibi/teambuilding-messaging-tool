import axios from 'axios'
import router from '@/router'

export default {
  registering: ({ commit }, userInfo) => {
    axios.post('http://localhost:5000/users/add', userInfo, { withCredentials: true })
      .then(() => {
        commit('registerDone')
      })
      .catch((err) => {
        if (err.response.data.alreadySignedUp) {
          console.log(err.response.data.alreadySignedUp)
          commit('registerFailed')
        }
      })
  },

  login: ({ commit }, userInfo) => {
    axios.post('http://localhost:5000/users/login', userInfo, { withCredentials: true })
      .then((response) => {
        console.log(response)
        commit('loginDone', response.data)
        router.push('mes-espaces')
      })
      .catch((err) => {
        if (err.response.data.nonExistingUser) {
          commit('loginNonExistingUser')
        } else if (err.response.data.wrongPassword) {
          commit('loginWrongPassword')
        }
      })
  }
}
