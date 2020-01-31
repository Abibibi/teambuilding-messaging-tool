<template>
  <Messages />
</template>

<script>

import Messages from '@/components/Messages.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Messages
  },
  computed: {
    ...mapState([
      'spaces'
    ])
  },
  methods: {
    ...mapActions([
      'messagesType'
    ])
  },
  mounted () {
    const spaceSlug = this.spaces.find((oneSpace) =>
      window.location.pathname.includes(oneSpace.name) ? oneSpace.name : ''
    ).name

    document.title = `Messages envoyés - ${spaceSlug} - Gratitude`
    this.messagesType()
  }
}
</script>
