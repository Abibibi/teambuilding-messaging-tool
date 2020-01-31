<template>
  <div>
    <Header />
      <div class="content-container content-container-logged">
        <h1 class="content-container-loggedtitle">Messages envoyés</h1>
        <div class="messages">
          <Message
            v-for="({ id, content, date, receiver }) in sentMessagesFormattedDate"
            :key="id"
            :messageContent="content"
            :messageDate="date"
            :sentMessageReceiver="receiver"
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
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Header,
    Message,
    Footer
  },
  data () {
    return {
      formattedReceivedMessages: []
    }
  },
  computed: {
    ...mapState([
      'spaces'
    ]),

    ...mapGetters([
      'sentMessagesFormattedDate'
    ])
  },
  methods: {
    ...mapActions([
      'catchSentMessages'
    ])
  },
  mounted () {
    this.catchSentMessages()

    const spaceSlug = this.spaces.find((oneSpace) =>
      window.location.pathname.includes(oneSpace.name) ? oneSpace.name : ''
    ).name

    document.title = `Messages reçus - ${spaceSlug} - Gratitude`
  }
}
</script>
