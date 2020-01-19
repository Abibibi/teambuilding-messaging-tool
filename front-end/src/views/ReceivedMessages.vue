<template>
  <Messages />
</template>

<script>

import Messages from '@/components/Messages.vue'

export default {
  components: {
    Messages
  },
  mounted () {
    document.title = 'Messages reçus - Espace - Gratitude'
  }
}
</script>
