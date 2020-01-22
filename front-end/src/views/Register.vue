<template>
  <div>
    <Header />
    <div class="content-container content-container-unlogged">
      <h1 class="form-title">Inscription</h1>
      <form @submit.prevent="handleSubmit" class="form-form" ref="form">
        <Field
          inputType="text"
          nameIdForText="firstname"
          v-model="user.firstname"
          titleText="Saisissez votre prénom"
          labelText="Prénom"
          inputClass="field-content-input"
          labelClass="field-content-label"
        />
        <Field
          inputType="email"
          nameIdForText="registerEmail"
          v-model="user.email"
          titleText="Saisissez votre e-mail"
          labelText="E-mail"
          inputClass="field-content-input"
          labelClass="field-content-label"
        />
        <Field
          inputType="password"
          nameIdForText="registerPassword"
          v-model="user.password"
          titleText="Saisissez un mot de passe"
          labelText="Mot de passe"
          inputClass="field-content-input"
          labelClass="field-content-label"
        />
        <p class="form-indication" ref="pwdIndication">Le mot de passe doit comprendre au minimum 8 caractères.</p>
        <Field
          inputType="password"
          nameIdForText="registerConfirmPassword"
          v-model="user.confirmPassword"
          titleText="Confirmez votre mot de passe"
          labelText="Confirmez le mot de passe"
          inputClass="field-content-input"
          labelClass="field-content-label"
        />
        <p class="form-indication" ref="confirmIndication">Les deux mots de passe doivent correspondre.</p>
        <Button />
        <router-link to="/connexion" class="content-link form-question">Déjà membre ? Connectez-vous</router-link>
        <p class="form-submission form-submission-success" v-if="registerSuccess && !registerFail">Inscription réussie</p>
        <p class="form-submission form-submission-fail" v-if="registerFail && !registerSuccess">Compte déjà existant</p>
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
        firstname: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  computed: {
    ...mapState([
      'registerSuccess',
      'registerFail'
    ])
  },
  methods: {
    ...mapActions([
      'registering'
    ]),

    scrollToEnd () {
      // to make sure form is visible after submission.
      // after submission, status of the submission result is displayed (either submission was successful or failed)
      // status is part of the form, so for it to be visible, scrollIntoView function will scroll to end of page
      const form = this.$refs.form
      form.scrollIntoView()
    },

    handleSubmit (event) {
      const { firstname, email, password, confirmPassword } = this.user

      if (password.length < 8) {
        return this.$refs.pwdIndication.classList.add('form-indication-error')
      } else {
        this.$refs.pwdIndication.classList.remove('form-indication-error')
      }

      if (password !== confirmPassword) {
        return this.$refs.confirmIndication.classList.add('form-indication-error')
      } else {
        this.$refs.confirmIndication.classList.remove('form-indication-error')
      }

      this.registering({ firstname, email, password })

      this.scrollToEnd()
    }
  },
  mounted () {
    document.title = 'Inscrivez-vous - Gratitude'
  }
}
</script>
