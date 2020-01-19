<template>
  <div>
    <Header />
    <div class="content-container content-container-unlogged">
      <h1 class="form-title">Inscription</h1>
      <form class="form-form">
        <Field
          inputType="text"
          nameIdForText="firstname"
          v-model="user.firstname"
          titleText="Saisissez votre prénom"
          labelText="Prénom"
        />
        <Field
          inputType="email"
          nameIdForText="registerEmail"
          v-model="user.email"
          titleText="Saisissez votre e-mail"
          labelText="E-mail"
        />
        <Field
          inputType="password"
          nameIdForText="registerPassword"
          v-model="user.password"
          titleText="Saisissez un mot de passe"
          labelText="Mot de passe"
        />
        <Field
          inputType="password"
          nameIdForText="registerConfirmPassword"
          v-model="user.confirmPassword"
          titleText="Confirmez votre mot de passe"
          labelText="Confirmez le mot de passe"
        />
        <Button />
        <router-link to="/connexion" class="form-question form-question-register">Déjà membre ? Connectez-vous</router-link>
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
      }
    }
  },
  mounted () {
    document.title = 'Inscrivez-vous - Gratitude'
  }
}
</script>
