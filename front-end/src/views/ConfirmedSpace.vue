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
import { mapState } from 'vuex'

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
  mounted () {
    document.title = 'Confirmation d\'adhésion - Gratitude'
    // todo: code action that turns vuex state property "tryToJoin" to false
  }
}
</script>
