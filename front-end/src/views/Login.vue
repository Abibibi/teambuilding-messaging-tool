<template>
  <div>
    <Header />
    <div class="content-container content-container-unlogged">
      <h1 class="form-title">Connexion</h1>
      <form @submit.prevent="handleSubmit" class="form-form" ref="form">
        <Field
          inputType="email"
          nameIdForText="loginEmail"
          v-model="user.email"
          titleText="Saisissez votre e-mail"
          labelText="E-mail"
          inputClass="field-content-input"
          labelClass="field-content-label"
        />
        <Field
          inputType="password"
          nameIdForText="loginPassword"
          v-model="user.password"
          titleText="Saisissez votre mot de passe"
          labelText="Mot de passe"
          inputClass="field-content-input"
          labelClass="field-content-label"
        />
        <Button />
        <router-link to="/inscription" class="content-link form-question">Première visite ? Inscrivez-vous</router-link>
        <p class="form-submission form-submission-success" v-if="loginSuccess && !nonExistingUser && wrongPassword">Connexion réussie</p>
        <p class="form-submission form-submission-fail" v-if="!loginSuccess && nonExistingUser && !wrongPassword">Compte inexistant</p>
        <p class="form-submission form-submission-fail" v-if="!loginSuccess && !nonExistingUser && wrongPassword">Mot de passe erroné</p>
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
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Header,
    Field,
    Button,
    Footer
  },
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState([
      'loginSuccess',
      'nonExistingUser',
      'wrongPassword'
    ])
  },
  methods: {
    ...mapActions([
      'login'
    ]),

    scrollToEnd () {
      // to make sure form is visible after submission.
      // after submission, status of the submission result is displayed (either submission was successful or failed)
      // status is part of the form, so for it to be visible, scrollIntoView function will scroll to end of page
      const form = this.$refs.form
      form.scrollIntoView()
    },

    handleSubmit (event) {
      this.login(this.user)

      this.scrollToEnd()
    }
  },
  mounted () {
    document.title = 'Identifiez-vous - Gratitude'
  }
}
</script>
