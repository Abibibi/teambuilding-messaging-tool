<template>
  <div>
    <div v-if="acceptJoining" class="content-container-logged-middle">
      <p class="content-joining-paragraph content-joining-paragraph-top">Bravo ! Vous avez rejoint l'espace {{ spaceToJoin.name }}.</p>
      <p class="content-joining-paragraph content-joining-paragraph-bottom">Vous pouvez y accéder en cliquant sur la carte ci-dessous :</p>
      <SpaceCard
        :spaceName=spaceToJoin.name
        :spacePicture=spaceToJoin.picture
        :spacePictureAlt=spaceToJoin.pictureAlt
      />
    </div>
    <div v-else-if="tryToJoin">
      <h1 class="content-container-loggedtitle">Bravo ! Vous avez rejoint l'espace {{ spaceToJoin.name }}.</h1>
      <div class="content-container-logged-middle">
        <p class="content-joining-paragraph content-joining-paragraph-bottom">Vous pouvez y accéder en cliquant sur la carte ci-dessous :</p>
          <SpaceCard
            :spaceName=spaceToJoin.name
            :spacePicture=spaceToJoin.picture
            :spacePictureAlt=spaceToJoin.pictureAlt
          />
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import SpaceCard from '@/components/SpaceCard.vue'

export default {
  props: {
    joiningFromAcceptView: Boolean
  },
  data () {
    return {
      acceptJoining: this.joiningFromAcceptView
    }
  },
  components: {
    SpaceCard
  },
  computed: {
    ...mapState([
      'tryToJoin',
      'spaceToJoin'
    ])
  }
}
</script>
