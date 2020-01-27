<template>
  <div class="spacecard">
    <router-link class="spacecard-link" :to="spaceURL">
      <img class="spacecard-spaceimage" :src="picture" :alt="pictureAlt" >
      <p class="spacecard-spacename">{{ name }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    spaceName: String,
    spacePicture: String,
    spacePictureAlt: String
  },
  data () {
    return {
      name: this.spaceName,
      picture: this.spacePicture,
      pictureAlt: this.spacePictureAlt,
      spaceURL: `/${this.spaceName}/envoyer-message`
    }
  }
}
</script>
