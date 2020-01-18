<template>
  <header class="header">
    <a class="header-websitename">Gratitude</a>
    <nav class="header-nav">
      <a v-show="!logged" href="#" class="header-nav-a header-nav-a-margin">S'inscrire</a>
      <a v-show="!logged" href="#" class="header-nav-a">S'identifier</a>
      <a v-show="logged" href="#" class="header-nav-a header-nav-a-margin">Mes espaces</a>
      <a v-show="logged" href="#" class="header-nav-a">Déconnexion</a>
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
