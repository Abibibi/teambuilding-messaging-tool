<template>
  <Messages />
</template>

<script>

import Messages from '@/components/Messages.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    Messages
  },
  methods: {
    ...mapActions([
      'messagesType'
    ])
  },
  mounted () {
    document.title = 'Messages reçus - Espace - Gratitude'
    this.messagesType()
  }
}
</script>
