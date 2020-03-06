/* eslint-disable */

import axios from 'axios'
import router from '@/router'

export default {
  registering: ({ commit }, userInfo) => {
    axios.post(`${process.env.VUE_APP_API}/users/add`, userInfo, { withCredentials: true })
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
    axios.post(`${process.env.VUE_APP_API}/users/login`, userInfo, { withCredentials: true })
      .then((response) => {
        console.log(response)
        commit('loginDone', response.data)

        if (state.tryToJoin) {
          dispatch('joiningOneSpace').then(() => {
            commit('spaceJoinedAfterLogin', state.spaceToJoin)
          })
          router.push(`/confirmation-adhesion/${state.spaceToJoin.name.toLowerCase()}`)
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

    axios.post(`${process.env.VUE_APP_API}/spaces/addSpace`, spaceInfo, config)
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
      .catch((err) => {
        if(err.response.data.alreadyInDB) {
          commit('spaceAlreadyExisting');
        }
        console.log(err.response.data.alreadyInDB)
      })
  },

  removePreviouslySubmittedSpace: ({ commit }) => {
    commit('previouslySubmittedSpaceRemoved')
  },

  removePreviouslyAlreadyExistingSpace: ({ commit }) => {
    commit('spaceAlreadyThereRemoved')
  },

  catchSessionUserSpaces: ({ commit }) => {
    axios.get(`${process.env.VUE_APP_API}/spaces/oneUserSpaces`, { withCredentials: true })
      .then((response) => {
        commit('connectedUserSpacesReceived', response.data)
      })
      .catch((err) => console.log(err))
  },

  catchSpaceToJoin: ({ commit, state }) => {
    const spaceName = state.spaces.find((oneSpace) =>
      window.location.pathname.includes(oneSpace.name.toLowerCase()) ? oneSpace.name : ''
    ).name

    console.log(spaceName)
    axios.get(`${process.env.VUE_APP_API}/spaces/spaceToJoin/${spaceName}`, { withCredentials: true })
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

    axios.get(`${process.env.VUE_APP_API}/spaces/spaceNewlyJoined/${spaceId}`, { withCredentials: true })
  },

  removeAlreadyJoinedSpace: ({ commit }) => {
    commit('alreadyJoinedSpaceRemoved')
  },

  tryToJoinBackToFalse: ({ commit }) => {
    commit('tryToJoinFalseAfterConfirmingJoiningSpace')
  },

  catchOneSpaceMembers: ({ commit, state }) => {
    axios.get(`${process.env.VUE_APP_API}/spaces/oneSpaceMembers/${state.currentSpace}`, { withCredentials: true })
      .then((response) => {
        commit('oneSpaceMembersReceived', response.data)
      })
      .catch((err) => console.log(err))
  },

  sendMessage: ({ commit, state }, messageInfo) => {
    messageInfo.spaceName = state.currentSpace

    axios.post(`${process.env.VUE_APP_API}/messages/addMessage`, messageInfo, { withCredentials: true })
      .then(() => {
        commit('messageSent')
      })
      .catch((err) => console.log(err))
  },

  leavingSendMessage: ({ commit }) => {
    commit('messageAlreadySent')
  },

  catchReceivedMessages: ({ commit, state }) => {
    axios.get(`${process.env.VUE_APP_API}/messages/receivedMessages/${state.currentSpace}`, { withCredentials: true })
      .then((response) => {
        commit('messagesReceivedDisplayed', response.data)
      })
      .catch((err) => console.log(err))
  },

  catchSentMessages: ({ commit, state }) => {
    axios.get(`${process.env.VUE_APP_API}/messages/sentMessages/${state.currentSpace}`, { withCredentials: true })
      .then((response) => {
        commit('messagesSentDisplayed', response.data)
      })
      .catch((err) => console.log(err))
  }
}
