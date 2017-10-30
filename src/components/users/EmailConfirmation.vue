<template>
<div class="main">
   <div class="ui middle aligned center aligned grid container">
      <div class="column">
        <h2 class="ui image header">
          <div class="content">
            Confirmation de votre adresse email
          </div>
        </h2>
        <div class="ui message" :class="{'icon': state === '', success: state === 'success', 'negative': state === 'errors'}">
          <i class="notched circle loading icon" v-show="state === ''"></i>
          <div class="header" v-show="state === 'success'">Votre email a été vérifié avec succès ! Il ne reste plus qu'a vous <router-link :to="{name: 'signin'}" exact active-class="active" class="purple item"> connectez ici</router-link></div>
          <div class="header" v-show="state === ''">Traitement en cours</div>
          <div class="header" v-show="state === 'errors'">Erreur lors de la vérification de votre email</div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
  import config from '../../config'
  export default {
    data () {
      return {
        message: 'Con',
        state: 'success'
      }
    },
    created: function () {
      this.$http.post(config.hostname + '/api/users/confirmation', {token: this.$route.params.token}).then(response => {
        if (response.body.message === 'Email verified') {
          this.state = 'success'
        } else if (response.body.errors) {
          this.state = 'errors'
        }
      })
    }
  }
</script>
