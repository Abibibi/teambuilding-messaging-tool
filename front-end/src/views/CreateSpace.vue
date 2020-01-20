<template>
  <div>
    <Header />
      <div class="content-container content-container-logged">
        <h1 class="content-container-loggedtitle">Créer un espace</h1>
        <form @submit.prevent="handleSubmit" class="form-form">
          <Field
            inputType="text"
            nameIdForText="spaceName"
            v-model="space.name"
            titleText="Saisissez le nom de votre espace"
            labelText="Nom de l'espace"
            inputClass="field-content-input field-content-input-space field-content-input-space-name"
            labelClass="field-content-label field-content-label-space"
          />
          <Field
            inputType="file"
            nameIdForText="spaceImage"
            :spaceImage="space.image"
            @update:spaceImage="space.image = $event"
            titleText="Choisissez l'image de votre espace"
            labelText="Image de l'espace"
            inputClass="field-content-input field-content-input-space field-content-input-space-image"
            labelClass="field-content-label field-content-label-space-up field-content-label-space-file"
          />
          <Button />
        </form>
      </div>
    <Footer />
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Field from '@/components/Field.vue'
import Button from '@/components/Button.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Header,
    Field,
    Button,
    Footer
  },
  data () {
    return {
      space: {
        name: '',
        image: {} // File type of data
      }
    }
  },
  methods: {
    handleSubmit () {
      console.log(this.space.name)
      console.log(this.space.image)
    }
  },
  mounted () {
    document.title = 'Créer un espace - Gratitude'
  }
}
</script>
