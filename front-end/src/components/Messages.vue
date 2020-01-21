<template>
  <div>
    <Header />
      <div class="content-container content-container-logged">
        <h1 v-if="messagesReceived" class="content-container-loggedtitle">Messages reçus</h1>
        <h1 v-else-if="messagesSent" class="content-container-loggedtitle">Messages envoyés</h1>
        <div class="messages">
          <Message />
          <Message />
        </div>
      </div>
    <Footer />
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Message from '@/components/Message.vue'
import Footer from '@/components/Footer.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Header,
    Message,
    Footer
  },
  computed: {
    ...mapState([
      'messagesReceived',
      'messagesSent'
    ])
  },
  mounted () {
    document.title = 'Messages reçus - Espace - Gratitude'
  }
}
</script>
