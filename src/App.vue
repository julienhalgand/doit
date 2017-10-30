<template>
  <div id="app">
    <div class="ui massive pointing attached stackable menu container">
      <router-link :to="{name: 'homepage'}" exact active-class="active" class="item"><img class="logo" src="/static/images/maison.svg" alt="Logo" title="Retour à la page d'accueil"><p>ACCUEIL</p></router-link>
      <a href="#" class="logo item" @click.prevent="previousPage"><img class="logo" src="/static/images/previous.svg" alt="Page précédente" title="Page précédente">PRÉCÉDENT</a>
      <a href="#" class="logo item" @click.prevent="nextPage">SUIVANT<img class="logo" src="/static/images/next.svg" alt="Page suivante" title="Page suivante"></a>
      <template v-if="isLoggedIn">
      <router-link :to="{name: 'profile'}" exact active-class="active" class="item"><img class="logo" src="/static/images/profil.svg" alt="Profil" title="Profil">PROFILE</router-link>
      <a href="#" @click.prevent="signout" class="item"><img class="logo" src="/static/images/signout.svg" alt="Déconnexion" title="Se déconnecter">DÉCONNEXION</a>
      </template>
      <template v-else>
        <router-link :to="{name: 'signup'}" exact active-class="active" class="item"><img class="logo" src="/static/images/profil.svg" alt="Inscription" title="Créer un compte">INSCRIPTION</router-link>
        <router-link :to="{name: 'signin'}" exact active-class="active" class="item"><img class="logo" src="/static/images/signin.svg" alt="Connexion" title="Se connecter">CONNEXION</router-link>
      </template>
    </div>
    <div class="ui message" :class="{'icon': isFormSend, 'negative': getFlashMessageStatus === 'errors', 'positive': getFlashMessageStatus === 'success'}" v-if="isFlashMessage">
      <i class="notched circle loading icon" v-if="isFormSend"></i>
      <i class="close icon" v-else @click.prevent="closeFlashMessage"></i>
      <div class="header" v-if="getFlashMessageStatus === 'errors'">
        Il y a des erreurs
      </div>
      <p>{{getFlashMessage}}</p>
    </div>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    data: () => {
      return {

      }
    },
    methods: {
      previousPage () {
        this.$router.go(-1)
      },
      nextPage () {
        this.$router.go(1)
      },
      signout () {
        this.$store.dispatch('logout')
        localStorage.setItem('persistFlash', true)
        this.$store.dispatch('setFlashMessage', {text: 'À bientôt !', status: 'success', persist: true})
        this.$router.push({name: 'homepage'})
      },
      closeFlashMessage: function () {
        this.$store.dispatch('unsetFlashMessage')
      }
    },
    computed: {
      isLoggedIn () {
        return this.$store.getters.isLoggedIn
      },
      isFormSend () {
        return this.$store.getters.isFormSend
      },
      getFlashMessage () {
        return this.$store.state.flashMessage
      },
      getFlashMessageStatus () {
        return this.$store.state.flashMessageStatus
      },
      isFlashMessage () {
        return this.$store.getters.isFlashMessage
      },
      persistFlashMessage () {
        return this.$store.state.persistFlashMessage
      }
    },
    watch: {
      '$route' (to, from) {
        if (this.isFlashMessage && !this.persistFlashMessage) {
          this.$store.dispatch('unsetFlashMessage')
        } else {
          if (this.persistFlashMessage) this.$store.dispatch('persistFlashMessage')
        }
      }
    }
  }
</script>
