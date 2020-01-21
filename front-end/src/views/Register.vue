<template>
  <div>
    <Header />
    <div class="content-container content-container-unlogged">
      <h1 class="form-title">Inscription</h1>
      <form @submit.prevent="handleSubmit" class="form-form">
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
        <p class="register-indication" v-if="indications.pwd" ref="pwdIndication">Le mot de passe doit comprendre au minimum 8 caractères.</p>
        <Field
          inputType="password"
          nameIdForText="registerConfirmPassword"
          v-model="user.confirmPassword"
          titleText="Confirmez votre mot de passe"
          labelText="Confirmez le mot de passe"
          inputClass="field-content-input"
          labelClass="field-content-label"
        />
        <p class="register-indication" v-if="indications.pwdEqualsConfirm" ref="confirmIndication">Les deux mots de passe doivent correspondre.</p>
        <Button />
        <router-link to="/connexion" class="content-link form-question form-question-register">Déjà membre ? Connectez-vous</router-link>
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
      user: {
        firstname: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      indications: {
        pwd: true,
        pwdEqualsConfirm: true
      }
    }
  },
  methods: {
    handleSubmit (event) {
      const { password, confirmPassword } = this.user

      if (password.length < 8) {
        this.$refs.pwdIndication.classList.add('register-indication-error')
      } else {
        this.$refs.pwdIndication.classList.remove('register-indication-error')
      }

      if (password !== confirmPassword) {
        this.$refs.confirmIndication.classList.add('register-indication-error')
      } else {
        this.$refs.confirmIndication.classList.remove('register-indication-error')
      }
    }
  },
  mounted () {
    document.title = 'Inscrivez-vous - Gratitude'
  }
}
</script>
