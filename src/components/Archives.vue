<template>
<section>
  <h1>Archives</h1>
  <div v-show="spinner" class="spinner">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
  <ul class="lists todo-list">
    <li v-for="list in lists">
      <router-link class="todoLink after" :to="{name: 'todos', params: {id: list.id}}">{{list.title}}</router-link>
      <button class="destroy" @click.prevent="deleteList(list)" title="Supprimer"></button>
      <button class="archived" @click.prevent="archiveList(list)" title="Archiver"><img width="40px" src="/static/images/archiver_icone.svg"></button>
    </li>
  </ul>
  <p v-if="!hasList"> Vous n'avez pas encore de liste de tâches dans vos archives</p>
</section>
</template>

<script>
import listsMixin from '../mixins/listsMixin'
import config from '../config'
export default {
  created: function () {
    this.$http.get(config.hostname + '/api/lists/archived').then(response => {
      this.spinner = false
      this.lists = response.body
    })
  },
  mixins: [listsMixin]
}
</script>
