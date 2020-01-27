<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions([
      'getAllSpaces',
      'isAuth'
    ]),

    getAllNecessaryInfo () {
      this.getAllSpaces()
        .then(() => {
          this.isAuth()
        })
    }
  },
  mounted () {
    this.getAllNecessaryInfo()
  }
}
</script>
