<template>
  <div class="spacecard">
    <router-link class="spacecard-link" :to="spaceURL">
      <img class="spacecard-spaceimage" :src="picture">
      <p class="spacecard-spacename">{{ name }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    spaceName: String,
    spacePicture: String
  },
  data () {
    return {
      name: this.spaceName,
      picture: this.spacePicture,
      spaceURL: `/${this.spaceName}/envoyer-message`
    }
  }
}
</script>
