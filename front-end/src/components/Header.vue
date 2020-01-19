<template>
  <header class="header">
    <router-link v-show="!logged" to="/" class="header-websitename">Gratitude</router-link>
    <router-link v-show="logged && !space" to="/espaces" class="header-websitename">Gratitude</router-link>
    <router-link v-show="logged && space" to="/messages-recus" class="header-websitename">Gratitude</router-link>
    <nav class="header-nav">
      <router-link to="/inscription" v-show="!logged" class="header-nav-a header-nav-a-margin">S'inscrire</router-link>
      <router-link to="/connexion" v-show="!logged" class="header-nav-a">S'identifier</router-link>
      <router-link to="/espaces" v-show="logged && !space" class="header-nav-a header-nav-a-margin">Mes espaces</router-link>
      <router-link to="#" v-show="logged &&!space" class="header-nav-a header-nav-a-margin">Créer un espace</router-link>
      <router-link to="#" v-show="logged &&!space" class="header-nav-a">Déconnexion</router-link>
      <router-link to="#" v-show="logged &&space" class="header-nav-a header-nav-a-margin">Messages reçus</router-link>
      <router-link to="#" v-show="logged &&space" class="header-nav-a header-nav-a-margin">Messages envoyés</router-link>
      <router-link to="#" v-show="logged &&space" class="header-nav-a">Envoyer un message</router-link>
    </nav>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'logged',
      'space'
    ])
  }
}
</script>
