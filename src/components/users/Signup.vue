<template>
<div class="main">
  <div class="ui middle aligned center aligned grid container">
    <div class="column">
      <h2>Créer votre compte</h2>
      <form class="ui large form" v-show="formShow">
        <div class="ui stacked secondary  segment">
          <div class="two fields">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="lastname" placeholder="Votre nom de famille" v-model="signupForm.lastname">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="firstname" placeholder="Votre prénom" v-model="signupForm.firstname">
              </div>
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="mail icon"></i>
              <input type="text" name="email" placeholder="Votre adresse email" v-model="signupForm.email">
            </div>
          </div>
          <div class="two fields">
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="Mot de passe" v-model="signupForm.password">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="passwordConfirmation" placeholder="Confirmez votre mot de passe" v-model="signupForm.passwordConfirmation">
              </div>
            </div>
          </div>
          <div class="g-recaptcha">
            <vue-recaptcha ref="recaptcha" @verify="onVerify" @expired="onExpired" sitekey="6Lc9pSMTAAAAANQhHIJvzhtQ8IpRx8pNo7F71lGn"></vue-recaptcha>
          </div>
          <div class="field">
            <div class="ui checkbox">
              <input type="checkbox" v-model="signupForm.cgvCheckbox">
              <label>J'accepte les conditions générales d'utilisation</label>
              <router-link :to="{name: 'cgu'}" exact active-class="active" class="purple item">CGU</router-link>
            </div>
          </div>
          <button class="ui fluid large submit pink button" :class="{'loading': formSend}" @click.prevent="signup">Envoyer</button>
        </div>
        <div class="ui error message"></div>
      </form>
      <div class="ui message" v-show="formShow">
        Déja un compte ? <router-link :to="{name: 'signin'}" exact active-class="active" class="purple item">Connectez-vous</router-link>
      </div>
      <div class="ui success message" v-show="!formShow">
        Votre compte a été crée avec succès !
        Un mail vient de vous être envoyer à l'adresse "{{signupForm.email}}" pour vérifier celle-ci.
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import config from '../../config'
  import VueRecaptcha from 'vue-recaptcha'
  import formMixin from '../../mixins/formMixin'

  export default {
    data: () => {
      return {
        signupForm: {
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          passwordConfirmation: '',
          recaptchaToken: '',
          cgvCheckbox: null
        }
      }
    },
    components: {
      'vue-recaptcha': VueRecaptcha
    },
    methods: {
      signup () {
        if (!this.formSend) {
          this.formSend = true
          this.$http.post(config.hostname + '/api/users', this.signupForm).then(response => {
            this.formSend = false
            // console.log(response)
            if (response.body.errors) {
              this.formSend = false
              let errors = response.body.errors
              this.message.title = 'Il y a des erreurs'
              this.message.state = 'errors'
              this.resetRecaptcha()
              var message = {}
              for (var i = 0; i < errors.length; i++) {
                message.content += errors[i] + ', '
              }
              this.$store.dispatch('setFlashMessage', {text: message.content, status: 'errors'})
            } else if (response.status === 201) {
              this.formShow = false
            } else {
              this.formSend = false
              this.$store.dispatch('setFlashMessage', {text: 'Il y a des erreurs !', status: 'errors'})
            }
          })
        }
      },
      onVerify: function (response) {
        this.signupForm.recaptchaToken = response
      },
      onExpired: function () {
        this.signupForm.recaptchaToken = ''
      },
      resetRecaptcha: function () {
        this.$refs.recaptcha.reset() // Direct call reset method
        this.signupForm.recaptchaToken = ''
      }
    },
    mixins: [formMixin]
  }
</script>
