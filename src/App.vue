<template>
  <div id="app">
    <router-link :to="{name: 'homepage'}"><img class="logo" src="/static/images/maison.svg" alt="Logo"></router-link>
    <a href="#" class="logo" @click.prevent="previousPage"><img class="logo" src="/static/images/previous.svg" alt="Logo"></a>
    <a href="#" class="logo" @click.prevent="nextPage"><img class="logo" src="/static/images/next.svg" alt="Logo"></a>
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
