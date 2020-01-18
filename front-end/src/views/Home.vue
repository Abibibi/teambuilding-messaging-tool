<template>
  <div>
    <Header />
    <div class="home">
      Coucou
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
    document.title = 'Gratitude'
  }
}
</script>

<style>

</style>
