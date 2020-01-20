<template>
  <div>
    <Header />
      <div class="content-container content-container-logged">
        <h1 class="content-container-loggedtitle">Untel vous invite à rejoindre l'espace Bla.</h1>
        <div class="content-container-logged-middle">
          <button class="button accept-space-button">Rejoindre</button>
          <div v-if="logged && joinedSpace" class="content-container-logged-middle">
            <p class="content-paragraph accept-paragraph accept-paragraph-top">Bravo ! Vous avez rejoint l'espace Bla.</p>
            <p class="content-paragraph accept-paragraph accept-paragraph-bottom">Vous pouvez y accéder en cliquant sur la carte ci-dessous :</p>
            <SpaceCard />
          </div>
          <div v-else-if="!logged && joiningWhileUnlogged" class="content-container-logged-middle">
            <p class="content-paragraph accept-paragraph accept-paragraph-top"><router-link to="/connexion" class="content-link">Connectez-vous</router-link> pour pouvoir rejoindre l'espace Bla.</p>
          </div>
        </div>
      </div>
    <Footer />
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import SpaceCard from '@/components/SpaceCard.vue'
import Footer from '@/components/Footer.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Header,
    SpaceCard,
    Footer
  },
  computed: {
    ...mapState([
      'logged',
      'joinedSpace',
      'joiningWhileUnlogged'
    ])
  },
  mounted () {
    document.title = 'Rejoindre un espace - Gratitude'
  }
}
</script>
