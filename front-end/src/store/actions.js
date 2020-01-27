import axios from 'axios'
import router from '@/router'

const path = window.location.pathname

export default {
  getAllSpaces: ({ commit }) => {
    axios.get('http://localhost:5000/spaces/allSpaces', { withCredentials: true })
      .then((response) => {
        console.log(response)
        commit('allSpacesReceived', response.data)
      })
  },

  isAuth: ({ commit, state }) => {
    axios.get('http://localhost:5000/users/isAuth', { withCredentials: true })
      .then((response) => {
        console.log(response)
        commit('alreadyAuthenticated', response.data)

        switch (path) {
          case '/':
          case '/inscription':
          case '/connexion':
            router.push('/mes-espaces')
            break
        }
      })
      .catch(() => {
        commit('notAuthenticated')
        console.log(path)
        const allSpaces = state.spaces
        // to make sure that the space in the accept-space route
        // matches one of the spaces in the state
        // before displaying the related page
        const oneSpace = allSpaces.find((oneSpace) => oneSpace.name === window.location.pathname.split('/').pop())

        if (path === '/inscription') {
          if (window.location.pathname !== path) router.push(path)
        } else if (path === '/connexion') {
          if (window.location.pathname !== path) router.push(path)
        } else if (path === '/') {
          if (window.location.pathname !== path) router.push(path)
        } else if (oneSpace) {
          if (path === `/accepter-espace/${oneSpace.name}`) {
            if (window.location.pathname !== path) router.push(path)
          }
        } else {
          if (window.location.pathname !== path) router.push('/')
        }

      /* switch (path) {
          // the "if (window.location.pathname !== path" code below
          // is to avoid navigation duplicates
          // (if user is already on /mes-espaces page and reloads page,
          // a new /mes-espaces page will not be pushed)
          case '/inscription':
          case '/connexion':
          case '/':
            if (window.location.pathname !== path) router.push(path)
            break
          case `/accepter-espace/${oneSpace.name}`:
            console.log(oneSpace.name)
            console.log(path)
            if (oneSpace.name) router.push(`/accepter-espace/${oneSpace.name}`)
            break
          default:
            // if user tries to access a page
            // that is not the /, /inscription or /connexion page
            // (namely the only page accessibles to non authenticated users),
            // they will be redirected to the / page
            router.push('/')
        }*/
      })
  },

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
  },

  removePreviousSpace: ({ commit }) => {
    commit('previouslySubmittedSpaceRemoved')
  }
}
