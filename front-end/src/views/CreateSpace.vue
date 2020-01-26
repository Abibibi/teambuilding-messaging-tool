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
            acceptText=".jpg,.jpeg,.png"
            titleText="Choisissez l'image de votre espace"
            labelText="Image de l'espace"
            inputClass="field-content-input field-content-input-space field-content-input-space-image"
            labelClass="field-content-label field-content-label-space-up field-content-label-space-file"
          />
          <Button />
        </form>
        <div v-if="createdSpace" class="content-container-logged-middle">
          <p>L'espace Bla a bien été créé. Vous pouvez le retrouver en cliquant sur la carte ci-dessous :</p>
          <SpaceCard />
          <p>Vous pouvez également inviter vos collègues à vous rejoindre dans l'espace en leur communiquant ce lien :</p>
          <router-link to="/accepter-espace-bla" class="home-form-link-a">Espace Bla</router-link>
        </div>
      </div>
    <Footer />
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Field from '@/components/Field.vue'
import SpaceCard from '@/components/SpaceCard.vue'
import Button from '@/components/Button.vue'
import Footer from '@/components/Footer.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Header,
    Field,
    SpaceCard,
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
  computed: {
    ...mapState([
      'createdSpace'
    ])
  },
  methods: {
    ...mapActions([
      'newSpace'
    ]),

    handleSubmit () {
      // information updated by Child component (Field) through two-way data binding
      // (with v-model for space.name and "update" event for space.image)
      console.log(this.space.name)
      console.log(this.space.image)

      const formData = new FormData()
      formData.append('name', this.space.name)
      formData.append('image', this.space.image)

      console.log(...formData)

      this.newSpace(formData)
    }
  },
  mounted () {
    document.title = 'Créer un espace - Gratitude'
  }
}
</script>
