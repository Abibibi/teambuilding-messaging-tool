<template>
  <div>
    <Header />
      <div class="content-container content-container-logged">
        <h1 class="content-container-loggedtitle">Mes espaces</h1>
        <div class="spacecards">
          <SpaceCard />
          <SpaceCard />
        </div>
      </div>
    <Footer />
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import SpaceCard from '@/components/SpaceCard.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Header,
    SpaceCard,
    Footer
  },
  mounted () {
    document.title = 'Mes espaces - Gratitude'
  }
}
</script>
