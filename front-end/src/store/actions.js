import axios from 'axios'

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
  }

}
