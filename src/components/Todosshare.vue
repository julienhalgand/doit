<template>
<section>
  <div v-if="spinner" class="spinner">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
  </section>
</template>
<script>
  import todos from '../mixins/todosMixin'
  import config from '../config'
  export default {
    created: function () {
      if (this.$store.getters.isLoggedIn) {
        this.$http.get(config.hostname + '/api/lists/share/' + this.$route.params.id).then(response => {
          this.spinner = false
          if (response.status === 200) {
            this.$store.dispatch('setFlashMessage', {text: 'Vous faites maintenant partis des collaborateurs de cette liste !', status: 'success', persist: true})
            this.$router.push({name: 'sharedlist', params: {id: response.body.id}})
          }
        }).catch((errors) => {
          console.log(errors)
        })
      } else {
        this.$store.dispatch('setFlashMessage', {text: 'Vous devez être connecté pour pouvoir collaborer sur une liste !', status: 'errors', persist: true})
        this.$router.push({name: 'signin'})
      }
    },
    mixins: [todos]
  }
</script>
