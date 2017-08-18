<template>
  <div id="app">
    <div class="ui fixed two item menu">
        <router-link :to="{name: 'root'}" exact class="item" active-class="active">Accueil</router-link>
        <router-link :to="{name: 'a'}" class="item" active-class="active">Page A</router-link>
    </div>
    <div class="sidebar">
      <router-view name="sidebar"></router-view>
    </div>
    <div class="main">
      <h1>Main</h1>
      <router-view></router-view>
    </div>
   <!--
    <todos>
    </todos>
    -->
  </div>
</template>

<script>
  import Todos from './components/Todos'
  export default {
    components: {
      Todos
    }
  }
</script>
