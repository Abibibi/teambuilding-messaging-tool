<template>
  <div class="spacecard">
    <router-link class="spacecard-link" :to="spaceURL">
      <div class="spacecard-spaceimage">
        <div class="spacecard-spaceimage-container">
          <img class="spacecard-spaceimage-container-content" :src="picture" :alt="pictureAlt" >
        </div>
      </div>
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
      spaceURL: `/${this.spaceName.toLowerCase()}/envoyer-message`
    }
  }
}
</script>
