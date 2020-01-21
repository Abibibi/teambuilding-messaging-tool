export default {
  registerDone: (state) => {
    state.registerSuccess = true
    state.registerFail = false
  },

  registerFailed: (state) => {
    state.registerFail = true
    state.registerSuccess = false
  }
}
