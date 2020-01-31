<template>
  <div class="message">
    <p v-show="messagesSent" class="message-receiver">À {{ receiver }}, <span class="message-date message-date-sent">le {{ date }}</span></p>
    <p v-show="messagesReceived" class="message-date message-date-received">Le {{ date }}</p>
    <p class="message-content">{{ content }}</p>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  props: {
    messageContent: String,
    messageDate: String,
    sentMessageReceiver: String
  },
  data () {
    return {
      content: this.messageContent,
      date: this.messageDate,
      receiver: this.sentMessageReceiver
    }
  },
  computed: {
    ...mapState([
      'messagesReceived',
      'messagesSent'
    ])
  }
}
</script>
