<template>
  <div>
    <Header />
      <div class="content-container content-container-logged">
        <h1 class="content-container-loggedtitle">{{ spaceToJoin.spaceCreator }} vous invite à rejoindre l'espace {{ spaceToJoin.name }}.</h1>
        <div class="content-container-logged-middle">
          <button class="button accept-space-button" @click="attemptJoining">Rejoindre</button>
          <JoinedSpace v-if="logged && joinedSpace" :joiningFromAcceptView="joiningFromAccept"/>
          <div v-else-if="!logged && joiningWhileUnlogged" class="content-container-logged-middle">
            <p class="content-joining-paragraph content-joining-paragraph-top"><router-link to="/connexion" class="content-link">Connectez-vous</router-link> pour pouvoir rejoindre l'espace {{ spaceToJoin.name }}.</p>
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
import { mapState, mapActions } from 'vuex'

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
      'spaceToJoin',
      'logged',
      'joinedSpace',
      'joiningWhileUnlogged'
    ])
  },
  methods: {
    ...mapActions([
      'removeAlreadyJoinedSpace',
      'catchSpaceToJoin',
      'firstTryingToJoinSpace'
    ]),

    attemptJoining () {
      this.firstTryingToJoinSpace()
    }
  },
  mounted () {
    document.title = 'Rejoindre un espace - Gratitude'
    this.removeAlreadyJoinedSpace()
    this.catchSpaceToJoin()
  }
}
</script>
