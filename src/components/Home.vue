<template>
<section>
  <input type="text" class="new-todo" placeholder="Saisir le titre d'une liste de tâche" v-model="title" @keyup.enter="addList">
  <footer class="footer">
      <ul class="filters">
        <li><a href="#" @click="addList">Créer</a></li>
        <li><a href="#">Rechercher</a></li>
      </ul>
  </footer>
  <ul class="lists">
    <li class="list" v-for="list in lists">
      <router-link :to="{name: 'todos', params: {id: list.id}}">{{list.title}}</router-link>
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
      lists: []
    }
  },
  created: function () {
    this.$http.get(config.hostname + '/lists').then(response => {
      this.lists = response.body
    })
  },
  methods: {
    addList () {
      console.log(this.$router)
      if (this.title.length > 0) {
        this.$http.post(config.hostname + '/lists', {title: this.title}).then(response => {
          this.$router.push({name: 'todos', params: response.body})
        })
        this.title = ''
      }
    }
  }
}
</script>
