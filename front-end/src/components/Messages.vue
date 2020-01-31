<template>
  <div>
    <Header />
      <div class="content-container content-container-logged">
        <h1 v-if="messagesReceived" class="content-container-loggedtitle">Messages reçus</h1>
        <h1 v-else-if="messagesSent" class="content-container-loggedtitle">Messages envoyés</h1>
        <div v-if="messagesReceived" class="messages">
          <Message
            v-for="({ id, content, date }) in messagesContentReceived"
            :key="id"
            :receivedMessageContent="content"
            :receivedMessageDate="date"
          />
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
      'messagesContentReceived',
      'messagesSent'
    ])
  },
  mounted () {
    document.title = 'Messages reçus - Espace - Gratitude'
  }
}
</script>
