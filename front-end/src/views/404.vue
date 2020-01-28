<template>
  <div>
    <Header />
    <div class="content-container content-container-unlogged">
      <p class ="home-concept">Page non trouvée</p>
    </div>
    <Footer />
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  },
  mounted () {
    document.title = 'Page non trouvée - Gratitude'
  }
}
</script>

<style>

</style>
