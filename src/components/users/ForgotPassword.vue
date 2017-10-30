<template>
<div class="main">
  <div class="ui middle aligned center aligned grid container">
      <div class="column">
        <h2 class="ui image header">
          <div class="content">
            Réinitialisez votre mot de passe 
          </div>
        </h2>
        <form class="ui large form">
          <div class="ui negative message" v-show="errorsInForm">
            <i class="close icon" @click="closeFormErrors"></i>
            <div class="header">
              Il y a des erreurs
            </div>
            <p>{{errorsContent}}</p>
          </div>
          <div class="ui stacked secondary  segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="mail icon"></i>
                <input type="text" name="email" placeholder="Votre adresse email" v-model="signupForm.email">
              </div>
            </div>
            <button class="ui fluid large submit pink button" :class="{'loading': formSend}" @click.prevent="signup">Envoyer</button>
          </div>
          <div class="ui error message"></div>
        </form>
        <div class="ui message">
          Pas encore inscrit ? <router-link :to="{name: 'signup'}" exact active-class="active" class="purple item">Créer un compte</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '../../config'
  export default {
    data: () => {
      return {
        signupForm: {
          email: '',
          password: ''
        },
        errorsInForm: false,
        errorsContent: ''
      }
    },
    methods: {
      login () {
        this.$http.post(config.hostname + '/api/login', {email: this.email, password: this.password}).then(response => {
          console.log(response)
        })
      }
    }
  }
</script>
