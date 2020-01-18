<template>
  <div>
    <Header />
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
