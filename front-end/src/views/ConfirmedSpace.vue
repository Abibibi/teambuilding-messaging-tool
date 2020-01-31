<template>
  <div>
    <Header />
      <div class="content-container content-container-logged">
        <JoinedSpace />
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
  computed: {
    ...mapState([
      'logged',
      'joinedSpace',
      'joiningWhileUnlogged'
    ])
  },
  methods: {
    ...mapActions([
      'tryToJoinBackToFalse'
    ])
  },
  mounted () {
    document.title = 'Confirmation d\'adhésion - Gratitude'
  },
  beforeDestroy () {
    this.tryToJoinBackToFalse()
  }
}
</script>
