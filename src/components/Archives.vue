<template>
<section>
  <h1>Archives</h1>
  <input type="text" class="new-todo" placeholder="Saisir le titre d'une liste de tâche" v-model="title" @keyup.enter="searchList">
  <footer class="footer">
      <ul class="filters">
        <li><a href="#" @click="searchList">Rechercher</a></li>
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
      <button class="destroy" @click="deleteList(list)"></button>
      <button class="archived" @click.prevent="unarchiveList(list)" title="Désarchiver"><img width="40px" src="/static/images/desarchiver_icone.svg" alt="Désarchiver"></button>
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
      archived: null,
      lists: []
    }
  },
  created: function () {
    this.$http.get(config.hostname + '/api/lists/archived').then(response => {
      this.lists = response.body
    })
  },
  methods: {
    searchList () {
      if (this.title.length > 0) {

      }
    },
    unarchiveList (list) {
      this.$http.put(config.hostname + '/api/lists/' + list.id, {archived: false}).then(response => {
        this.lists = this.lists.filter(i => i !== list)
      })
    },
    deleteList (list) {
      this.$dialog.confirm('Please confirm to continue').then(() => {
        this.$http.delete(config.hostname + '/api/lists/' + list.id).then(response => {
          this.lists = this.lists.filter(i => i !== list)
        })
      })
    }
  }
}
</script>
