<template>
  <div id="app">
    <router-link :to="{name: 'homepage'}"><img class="logo" src="/static/images/maison.svg" alt="Logo" title="Retour à la page d'accueil"></router-link>
    <a href="#" class="logo" @click.prevent="previousPage"><img class="logo" src="/static/images/previous.svg" alt="Page précédente" title="Page précédente"></a>
    <a href="#" class="logo" @click.prevent="nextPage"><img class="logo" src="/static/images/next.svg" alt="Page suivante" title="Page suivante"></a>
    <router-link :to="{name: 'archives'}"><img class="logo" src="/static/images/archives.svg" alt="Archives" title="Se rendre sur la page archives"></router-link>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    methods: {
      previousPage () {
        this.$router.go(-1)
      },
      nextPage () {
        this.$router.go(1)
      }
    }
  }
</script>
