<template>
  <div>
    <Header />
      <div class="content-container content-container-logged">
        <h1 class="content-container-loggedtitle">Untel vous invite à rejoindre l'espace Bla.</h1>
        <div class="content-container-logged-middle">
          <button class="button accept-space-button">Rejoindre</button>
          <JoinedSpace v-if="logged && joinedSpace" :joiningFromAcceptView="joiningFromAccept"/>
          <div v-else-if="!logged && joiningWhileUnlogged" class="content-container-logged-middle">
            <p class="content-joining-paragraph content-joining-paragraph-top"><router-link to="/connexion" class="content-link">Connectez-vous</router-link> pour pouvoir rejoindre l'espace Bla.</p>
          </div>
        </div>
      </div>
    <Footer />
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import JoinedSpace from '@/components/JoinedSpace.vue'
import Footer from '@/components/Footer.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Header,
    JoinedSpace,
    Footer
  },
  data () {
    return {
      joiningFromAccept: true
    }
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
