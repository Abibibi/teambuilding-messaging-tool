<template>
  <div>
    <Header />
    <div class="content-container content-container-unlogged">
      <h1 class="form-title">Connexion</h1>
      <form class="form-form">
        <Field
          inputType="email"
          nameIdForText="loginEmail"
          v-model="user.email"
          titleText="Saisissez votre e-mail"
          labelText="E-mail"
        />
        <Field
          inputType="password"
          nameIdForText="loginPassword"
          v-model="user.password"
          titleText="Saisissez votre mot de passe"
          labelText="Mot de passe"
        />
        <Button />
        <router-link to="/inscription" class="form-question">Première visite ? Inscrivez-vous</router-link>
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
        email: '',
        password: ''
      }
    }
  },
  mounted () {
    document.title = 'Identifiez-vous - Gratitude'
  }
}
</script>
