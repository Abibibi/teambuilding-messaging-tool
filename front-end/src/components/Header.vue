<template>
  <header class="header">
    <router-link v-if="!logged" to="/" class="header-websitename">Gratitude</router-link>
    <router-link v-if="logged" to="/mes-espaces" class="header-websitename">Gratitude</router-link>
    <nav class="header-nav">
      <ul class="header-nav-ul">
        <li class="header-nav-ul-li" v-if="!logged"><router-link class="header-nav-ul-li-a" to="/inscription"><font-awesome-icon icon="user-plus" size="2x" class="header-nav-ul-li-a-icon" /><p class="header-nav-ul-li-a-text">S'inscrire</p></router-link></li>
        <li class="header-nav-ul-li" v-if="!logged"><router-link class="header-nav-ul-li-a" to="/connexion"><font-awesome-icon icon="sign-in-alt" size="2x" class="header-nav-ul-li-a-icon" /><p class="header-nav-ul-li-a-text">S'identifier</p></router-link></li>
        <li class="header-nav-ul-li" v-if="logged && !space"><router-link class="header-nav-ul-li-a" to="/mes-espaces"><font-awesome-icon icon="users" size="2x" class="header-nav-ul-li-a-icon" /><p class="header-nav-ul-li-a-text">Mes espaces</p></router-link></li>
        <li class="header-nav-ul-li" v-if="logged && !space"><router-link class="header-nav-ul-li-a" to="/creer-un-espace"><font-awesome-icon icon="folder-plus" size="2x" class="header-nav-ul-li-a-icon" /><p class="header-nav-ul-li-a-text">Créer un espace</p></router-link></li>
        <li class="header-nav-ul-li" v-if="logged && !space"><router-link class="header-nav-ul-li-a" to="/logout"><font-awesome-icon icon="sign-out-alt" size="2x" class="header-nav-ul-li-a-icon" /><p class="header-nav-ul-li-a-text">Déconnexion</p></router-link></li>
        <li class="header-nav-ul-li" v-if="logged && space"><router-link class="header-nav-ul-li-a" :to="'/' + currentSpace.toLowerCase() + '/envoyer-message'"><font-awesome-icon icon="paper-plane" size="2x" class="header-nav-ul-li-a-icon" /><p class="header-nav-ul-li-a-text">Envoyer un message</p></router-link></li>
        <li class="header-nav-ul-li" v-if="logged && space"><router-link class="header-nav-ul-li-a" :to="'/' + currentSpace.toLowerCase() + '/messages-envoyes'"><font-awesome-icon icon="comment" size="2x" class="header-nav-ul-li-a-icon" /><p class="header-nav-ul-li-a-text">Messages envoyés</p></router-link></li>
        <li class="header-nav-ul-li" v-if="logged && space"><router-link class="header-nav-ul-li-a" :to="'/' + currentSpace.toLowerCase() + '/messages-recus'"><font-awesome-icon icon="comment" size="2x" class="header-nav-ul-li-a-icon" flip="horizontal" /><p class="header-nav-ul-li-a-text">Messages reçus</p></router-link></li>
        <li class="header-nav-ul-li" v-if="logged && space"><router-link class="header-nav-ul-li-a" to="/mes-espaces"><font-awesome-icon icon="users" size="2x" class="header-nav-ul-li-a-icon" /><p class="header-nav-ul-li-a-text">Mes espaces</p></router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'logged',
      'space',
      'spaces',
      'currentSpace'
    ])
  }
}
</script>
