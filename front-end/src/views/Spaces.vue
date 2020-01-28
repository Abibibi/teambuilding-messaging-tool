<template>
  <div>
    <Header />
      <div class="content-container content-container-logged">
        <h1 class="content-container-loggedtitle">Mes espaces</h1>
        <div class="spacecards">
          <SpaceCard
            v-for="({ id, name, picture, pictureAlt }) in sessionUserSpaces"
            :key="id"
            :spaceName="name"
            :spacePicture="picture"
            :spacePictureAlt="pictureAlt"
          />
        </div>
      </div>
    <Footer />
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import SpaceCard from '@/components/SpaceCard.vue'
import Footer from '@/components/Footer.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Header,
    SpaceCard,
    Footer
  },
  computed: {
    ...mapState([
      'sessionUserSpaces'
    ])
  },
  methods: {
    ...mapActions([
      'catchSessionUserSpaces'
    ])
  },
  mounted () {
    document.title = 'Mes espaces - Gratitude'
    this.catchSessionUserSpaces()
  }
}
</script>
