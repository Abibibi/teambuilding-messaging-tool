<template>
  <div>
    <Header />
      <div class="content-container content-container-logged content-container-logged-middle">
        <h1 class="content-container-loggedtitle">Envoyer un message</h1>
        <form @submit.prevent="handleSubmit" class="form-form send-form" ref="form">
          <Field
            inputType="text"
            nameIdForText="member"
            v-model="member.firstname"
            titleText="Choisissez le membre auquel vous souhaitez envoyer un message"
            labelText="Destinataire"
            inputClass="send-form-input field-content-input field-content-input-space field-content-input-space-name "
            labelClass="field-content-label field-content-label-space"
            listText="allMembers"
            :membersCaught="spaceMembers"
          />
          <div class="send-form-textarea">
            <h2 class="send-form-textarea-title">Votre message :</h2>
            <textarea v-model="message" class="send-form-textarea-textarea" required></textarea>
          </div>
          <button class="button send-form-button">Envoyer</button>
          <p class="form-submission form-submission-success" v-if="sendMessageSuccess">Message envoyé</p>
        </form>
      </div>
    <Footer />
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Field from '@/components/Field.vue'
import Footer from '@/components/Footer.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Header,
    Field,
    Footer
  },
  data () {
    return {
      member: {
        firstname: ''
      },
      message: ''
    }
  },
  computed: {
    ...mapState([
      'spaceMembers',
      'sendMessageSuccess'
    ])
  },
  methods: {
    ...mapActions([
      'catchOneSpaceMembers',
      'sendMessage'
    ]),

    scrollToEnd () {
      // to make sure form is visible after submission.
      // after submission, status of the submission result is displayed
      // status is part of the form, so for it to be visible, scrollIntoView function will scroll to end of page
      const form = this.$refs.form
      form.scrollIntoView()
    },

    handleSubmit () {
      const messageInfo = {
        receiver: this.member.firstname,
        content: this.message
      }

      this.sendMessage(messageInfo)

      this.member.firstname = ''
      this.message = ''

      this.scrollToEnd()
    }
  },
  mounted () {
    this.catchOneSpaceMembers()
  }
}
</script>
