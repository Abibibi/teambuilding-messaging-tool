<template>
  <div>
    <Header />
    <div class="home">
      Coucou
    </div>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'

export default {
  components: {
    Header
  },
  mounted () {
    document.title = 'Gratitude'
  }
}
</script>

<style>

</style>
