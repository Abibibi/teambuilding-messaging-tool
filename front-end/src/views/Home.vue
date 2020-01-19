<template>
  <div>
    <Header />
    <div class="content">
      <p class ="home-concept">Témoignez de la reconnaissance envers vos collègues <br> de façon anonyme <br> <span class="home-concept-end">et recevez-en.</span></p>
      <div class="home-form-link home-form-link-register">
        <a class="home-form-link-a">Inscrivez-vous</a>
      </div>
      <div class="home-form-link">
        <a class="home-form-link-a">Connectez-vous</a>
      </div>
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
    document.title = 'Bienvenue - Gratitude'
  }
}
</script>

<style>

</style>
