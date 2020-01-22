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
      'isAuth'
    ])
  },
  mounted () {
    this.isAuth()
  }
}
</script>
