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
        <Field
          inputType="password"
          nameIdForText="registerConfirmPassword"
          v-model="user.confirmPassword"
          titleText="Confirmez votre mot de passe"
          labelText="Confirmez le mot de passe"
          inputClass="field-content-input"
          labelClass="field-content-label"
        />
        <Button />
        <router-link to="/connexion" class="content-link form-question form-question-register">Déjà membre ? Connectez-vous</router-link>
        <p v-if="user.pwdEqualsConfirm === false">Les mots de passe ne correspondent pas.</p>
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
        confirmPassword: '',
        pwdEqualsConfirm: true
      }
    }
  },
  methods: {
    handleSubmit (event) {
      const { password, confirmPassword } = this.user
      if (password !== confirmPassword) {
        this.user.pwdEqualsConfirm = false
      }
      console.log(this.user.pwdEqualsConfirm)
    }
  },
  mounted () {
    document.title = 'Inscrivez-vous - Gratitude'
  }
}
</script>
