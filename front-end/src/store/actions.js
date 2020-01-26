import axios from 'axios'
import router from '@/router'

const path = window.location.pathname

export default {
  isAuth: ({ commit }) => {
    axios.get('http://localhost:5000/users/isAuth', { withCredentials: true })
      .then((response) => {
        console.log(response)
        commit('alreadyAuthenticated', response.data)

        if (path === '/' || path === '/inscription' || path === '/connexion') {
          router.push('/mes-espaces')
        }
      })
      .catch(() => {
        commit('notAuthenticated')
        console.log(path)

        switch (path) {
          case '/inscription':
            // the "if (window.location.pathname !== path" code below
            //  is to avoid navigation duplicates
            // (if user is already on /mes-espaces page and reloads page,
            // a new /mes-espaces page will not be pushed)
            if (window.location.pathname !== path) router.push('/inscription')
            break
          case '/connexion':
            if (window.location.pathname !== path) router.push('/connexion')
            break
          case '/':
            if (window.location.pathname !== path) router.push('/')
            break
          default:
            // if user tries to access a page
            // that is not the /, /inscription or /connexion page
            // (namely the only page accessibles to non authenticated users),
            // they will be redirected to the / page
            router.push('/')
        }
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
