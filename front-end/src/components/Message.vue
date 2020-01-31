<template>
  <div class="message">
    <p v-if="messagesSent" class="message-receiver">to Bla, <span class="message-date message-date-sent">le 12 décembre 2019</span></p>
    <p v-else-if="messagesReceived" class="message-date message-date-received">Le {{ receivedDate }}</p>
    <p class="message-content">{{ receivedContent }}</p>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  props: {
    receivedMessageContent: String,
    receivedMessageDate: String
  },
  data () {
    return {
      receivedContent: this.receivedMessageContent,
      receivedDate: this.receivedMessageDate
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
