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
        router.push('/mes-espaces')
      })
      .catch((err) => {
        if (err.response.data.nonExistingUser) {
          commit('loginNonExistingUser')
        } else if (err.response.data.wrongPassword) {
          commit('loginWrongPassword')
        }
      })
  },

  newSpace: ({ commit }, spaceInfo) => {
    const config = {
      headers: {
        // to be able to send space info properly
        'content-type': 'multipart/form-data'
      },
      withCredentials: true
    }

    axios.post('http://localhost:5000/spaces/addSpace', spaceInfo, config)
      .then((response) => {
        const sentSpace = response.data[0][0]

        console.log(sentSpace)

        const spaceToAdd = {
          id: sentSpace.id,
          name: sentSpace.name,
          picture: sentSpace.picture
        }

        commit('newSpaceAdded', spaceToAdd)
      })
      .catch((err) => console.log(err))
  },

  removePreviousSpace: ({ commit }) => {
    commit('previouslySubmittedSpaceRemoved')
  },

  catchSessionUserSpaces: ({ commit }) => {
    axios.get('http://localhost:5000/spaces/oneUserSpaces', { withCredentials: true })
      .then((response) => {
        commit('connectedUserSpacesReceived', response.data)
      })
      .catch((err) => console.log(err))
  },

  catchSpaceToJoin: ({ commit, state }) => {
    const spaceToSend = state.spaces.find((oneSpace) =>
      window.location.pathname.includes(oneSpace.name) ? oneSpace.name : ''
    ).name

    console.log(spaceToSend)
    axios.get(`http://localhost:5000/spaces/spaceToJoin/${spaceToSend}`, { withCredentials: true })
      .then((response) => {
        commit('spaceAboutToJoin', response.data)
      })
      .catch((err) => console.log(err))
  }
}
