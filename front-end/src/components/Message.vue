<template>
  <div class="message">
    <p v-if="messagesSent" class="message-receiver">to Bla, <span class="message-date message-date-sent">le 12 décembre 2019</span></p>
    <p v-else-if="messagesReceived" class="message-date message-date-received">Le 12 décembre 2019</p>
    <p class="message-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum in quia eius nostrum possimus, voluptate corporis quas quam vitae hic eos nemo animi itaque quidem sequi dolorem nulla voluptatem accusantium.</p>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'messagesReceived',
      'messagesSent'
    ])
  }
}
</script>
