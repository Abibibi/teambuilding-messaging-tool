import axios from 'axios'

export default {
  registering: ({ commit }) => {
    axios.post('http://localhost:5000/users/add', { withCredentials: true })
      .then(() => {
        commit('registerDone')
      })
      .catch((err) => {
        console.log(err)
      })
  }

}
