<template>
<section>
  <h1>Bienvenue</h1>
  <input type="text" class="new-todo" placeholder="Saisir le titre d'une liste de tâche" v-model="title" @keyup.enter="addList">
  <footer class="footer">
      <ul class="filters">
        <li><a href="#" @click="addList">Créer</a></li>
        <li><a href="#">Rechercher</a></li>
      </ul>
  </footer>
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
</section>
</template>

<script>
import config from '../config'
export default {
  data: function () {
    return {
      title: '',
      spinner: true,
      lists: []
    }
  },
  created: function () {
    this.$http.get(config.hostname + '/api/lists/unarchived').then(response => {
      this.spinner = false
      this.lists = response.body
    })
  },
  methods: {
    addList () {
      if (this.title.length > 0) {
        this.$http.post(config.hostname + '/api/lists', {title: this.title}).then(response => {
          this.$router.push({name: 'todos', params: response.body})
        })
        this.title = ''
      }
    },
    archiveList (list) {
      this.$http.put(config.hostname + '/api/lists/' + list.id, {archived: true}).then(response => {
        this.lists = this.lists.filter(i => i !== list)
      })
    },
    deleteList (list) {
      this.$dialog.confirm('Confirmez la suppression de "' + list.title + '" ?').then(() => {
        this.$http.delete(config.hostname + '/api/lists/' + list.id).then(response => {
          this.lists = this.lists.filter(i => i !== list)
        })
      })
    }
  }
}
</script>
