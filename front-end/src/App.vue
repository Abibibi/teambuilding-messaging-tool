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
      .then(() => {
        console.log(this.$route)

        if (this.$route.path === '/' || this.$route.path === '/inscription' || this.$route.path === '/connexion') {
          this.$router.push('/mes-espaces')
        }
      })
      .catch(() => {
        console.log(this.$route)

        // the "if (window.location.pathname !== path" code below
        //  is to avoid navigation duplicates
        // (if user is already on /mes-espaces page and reloads page,
        // a new /mes-espaces page will not be pushed)
        if (this.$route.path === '/inscription') {
          const path = '/inscription'
          if (this.$route.path !== path) this.$router.push(path)
        } else if (this.$route.path === 'connexion') {
          const path = '/connexion'
          if (this.$route.path !== path) this.$router.push(path)
        } else if (this.$route.path === '/') {
          const path = '/'
          if (this.$route.path !== path) this.$router.push(path)
        } else if (this.$route.params.espace) {
          if (window.location.pathname !== this.$route.path) this.$router.push({ name: 'accept-space' })
        } else {
          // if user tries to access a page
          // that is not the /, /inscription or /connexion page
          // (namely the only page accessibles to non authenticated users),
          // they will be redirected to the / page
          this.$router.push('/')
        }
      })
  }
}
</script>
