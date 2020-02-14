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

  login: ({ commit, state, dispatch }, userInfo) => {
    axios.post('http://localhost:5000/users/login', userInfo, { withCredentials: true })
      .then((response) => {
        console.log(response)
        commit('loginDone', response.data)

        if (state.tryToJoin) {
          dispatch('joiningOneSpace').then(() => {
            commit('spaceJoinedAfterLogin', state.spaceToJoin)
          })
          router.push(`/confirmation-adhesion/${state.spaceToJoin.name}`)
        } else {
          router.push('/mes-espaces')
        }
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

  removePreviouslySubmittedSpace: ({ commit }) => {
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
    const spaceName = state.spaces.find((oneSpace) =>
      window.location.pathname.includes(oneSpace.name) ? oneSpace.name : ''
    ).name

    console.log(spaceName)
    axios.get(`http://localhost:5000/spaces/spaceToJoin/${spaceName}`, { withCredentials: true })
      .then((response) => {
        commit('spaceAboutToJoin', response.data)
      })
      .catch((err) => console.log(err))
  },

  firstTryingToJoinSpace: ({ state, dispatch, commit }) => {
    if (state.logged) {
      dispatch('joiningOneSpace').then(() => {
        commit('spaceJoinedWhenInitiallyLogged', state.spaceToJoin)
      })
    } else {
      commit('spaceNotJoinedBecauseUnlogged')
    }
  },

  joiningOneSpace: ({ state }) => {
    const spaceId = state.spaceToJoin.id

    axios.get(`http://localhost:5000/spaces/spaceNewlyJoined/${spaceId}`, { withCredentials: true })
  },

  removeAlreadyJoinedSpace: ({ commit }) => {
    commit('alreadyJoinedSpaceRemoved')
  },

  tryToJoinBackToFalse: ({ commit }) => {
    commit('tryToJoinFalseAfterConfirmingJoiningSpace')
  },

  catchOneSpaceMembers: ({ commit, state }) => {
    const spaceName = state.spaces.find((oneSpace) =>
      window.location.pathname.includes(oneSpace.name) ? oneSpace.name : ''
    ).name

    axios.get(`http://localhost:5000/spaces/oneSpaceMembers/${spaceName}`, { withCredentials: true })
      .then((response) => {
        commit('oneSpaceMembersReceived', response.data)
      })
      .catch((err) => console.log(err))
  },

  sendMessage: ({ commit, state }, messageInfo) => {
    const spaceName = state.spaces.find((oneSpace) =>
      window.location.pathname.includes(oneSpace.name) ? oneSpace.name : ''
    ).name

    messageInfo.spaceName = spaceName

    axios.post(`http://localhost:5000/messages/addMessage`, messageInfo, { withCredentials: true })
      .then(() => {
        commit('messageSent')
      })
      .catch((err) => console.log(err))
  },

  leavingSendMessage: ({ commit }) => {
    commit('messageAlreadySent')
  },

  catchReceivedMessages: ({ commit, state }) => {
    const spaceName = state.spaces.find((oneSpace) =>
      window.location.pathname.includes(oneSpace.name) ? oneSpace.name : ''
    ).name

    axios.get(`http://localhost:5000/messages/receivedMessages/${spaceName}`, { withCredentials: true })
      .then((response) => {
        commit('messagesReceivedDisplayed', response.data)
      })
      .catch((err) => console.log(err))
  },

  catchSentMessages: ({ commit, state }) => {
    const spaceName = state.spaces.find((oneSpace) =>
      window.location.pathname.includes(oneSpace.name) ? oneSpace.name : ''
    ).name

    axios.get(`http://localhost:5000/messages/sentMessages/${spaceName}`, { withCredentials: true })
      .then((response) => {
        commit('messagesSentDisplayed', response.data)
      })
      .catch((err) => console.log(err))
  }
}
