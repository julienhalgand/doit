<template>

</template>

<script>
  export default {
    created: function () {
      this.$store.dispatch('setFlashMessage', {text: 'Cette page n\'existe pas ou plus ! Vous avez donc été redirigé sur la page d\'accueil.', status: 'errors', persist: true})
      this.$router.push({name: 'homepage'})
    }
  }
</script>
