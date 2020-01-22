export default {
  alreadyAuthenticated: (state, payload) => {
    state.logged = true
    state.firstname = payload.firstname
    state.email = payload.email
  },

  notAuthenticated: (state) => {
    state.logged = false
    state.firstname = ''
    state.email = ''
  },

  registerDone: (state) => {
    state.registerSuccess = true
    state.registerFail = false
  },

  registerFailed: (state) => {
    state.registerFail = true
    state.registerSuccess = false
  },

  loginDone: (state, payload) => {
    state.loginSuccess = true
    state.nonExistingUser = false
    state.wrongPassword = false
    state.logged = true
    state.firstname = payload.firstname
    state.email = payload.email
  },

  loginNonExistingUser: (state) => {
    state.loginSuccess = false
    state.nonExistingUser = true
    state.wrongPassword = false
    state.logged = false
    state.firstname = ''
    state.email = ''
  },

  loginWrongPassword: (state) => {
    state.loginSuccess = false
    state.nonExistingUser = false
    state.wrongPassword = true
    state.logged = false
    state.firstname = ''
    state.email = ''
  }
}
