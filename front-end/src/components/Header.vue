<template>
  <header class="header">
    <router-link to="/" class="header-websitename">Gratitude</router-link>
    <nav class="header-nav">
      <router-link to="/inscription" v-show="!logged" class="header-nav-a header-nav-a-margin">S'inscrire</router-link>
      <router-link to="/connexion" v-show="!logged" class="header-nav-a">S'identifier</router-link>
      <router-link to="/espaces" v-show="logged" class="header-nav-a header-nav-a-margin">Mes espaces</router-link>
      <router-link to="#" v-show="logged" class="header-nav-a header-nav-a-margin">Créer un espace</router-link>
      <router-link to="#" v-show="logged" class="header-nav-a">Déconnexion</router-link>
    </nav>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'logged'
    ])
  }
}
</script>
