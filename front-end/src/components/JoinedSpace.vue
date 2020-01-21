<template>
  <div>
    <div v-if="acceptJoining" class="content-container-logged-middle">
      <p class="content-joining-paragraph content-joining-paragraph-top">Bravo ! Vous avez rejoint l'espace Bla.</p>
      <p class="content-joining-paragraph content-joining-paragraph-bottom">Vous pouvez y accéder en cliquant sur la carte ci-dessous :</p>
      <SpaceCard />
    </div>
    <div v-else-if="confirmedJoining">
      <h1 class="content-container-loggedtitle">Bravo ! Vous avez rejoint l'espace Bla.</h1>
      <div class="content-container-logged-middle">
        <p class="content-joining-paragraph content-joining-paragraph-bottom">Vous pouvez y accéder en cliquant sur la carte ci-dessous :</p>
          <SpaceCard />
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import SpaceCard from '@/components/SpaceCard.vue'

export default {
  props: {
    joiningFromAcceptView: Boolean,
    joiningFromConfirmedView: Boolean
  },
  data () {
    return {
      acceptJoining: this.joiningFromAcceptView,
      confirmedJoining: this.joiningFromConfirmedView
    }
  },
  components: {
    SpaceCard
  },
  computed: {
    ...mapState([

    ])
  }
}
</script>
