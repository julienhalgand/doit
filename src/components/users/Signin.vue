<template>
<div class="main">
  <div class="ui middle aligned center aligned grid container">
      <div class="column">
        <h2>Connexion</h2>
        <form class="ui large form">
          <div class="ui stacked secondary segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="mail icon"></i>
                <input type="text" name="email" placeholder="Votre adresse email" v-model="signinForm.email">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="Mot de passe" v-model="signinForm.password">
              </div>
            </div>
            <div class="ui message">
            Mot de passe oublié ? <router-link :to="{name: 'forgotPassword'}" exact active-class="active" class="purple item">Réinitialisez votre mot de passe</router-link>
            </div>
            <button class="ui fluid large submit pink button" :class="{'loading': formSend}" @click.prevent="signin">Envoyer</button>
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
  import formMixin from '../../mixins/formMixin'

  export default {
    data: () => {
      return {
        signinForm: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      signin () {
        this.formSend = true
        this.message.title = 'Traitement du formulaire'
        this.$http.post(config.hostname + '/api/users/login', this.signinForm).then(response => {
          if (response.body.jwt) {
            this.$store.dispatch('login', response.body.jwt).then(() => {
              this.$store.dispatch('setFlashMessage', {text: 'Bonjour !', status: 'success', persist: true})
              this.$router.push({name: 'profile'})
            })
          } else if (response.body.errors) {
            this.formSend = false
            this.$store.dispatch('setFlashMessage', {text: response.body.errors, status: 'errors'})
          }
        }).catch(errors => {
          if (errors.status === 400) {
            this.formSend = false
            this.$store.dispatch('setFlashMessage', {text: 'Pas de correspondance email/mot de passe', status: 'errors'})
          }
        })
      }
    },
    mixins: [formMixin]
  }
</script>
