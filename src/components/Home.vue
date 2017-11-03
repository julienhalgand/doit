<template>
<section>
  <h2>Bienvenue</h2>
    <select v-model="isPublic" class="ui fluid dropdown">
      <option v-for="option in privacyArray" v-bind:value="option.value">
        {{ option.text }}
      </option>
    </select>
  <input type="text" class="new-todo" placeholder="Saisir le titre d'une liste de tâche" v-model="title" @keyup.enter="addList">
  <footer class="footer">
      <ul class="filters">
        <li><a href="#" @click.prevent="addList">Créer</a></li>
      </ul>
  </footer>
  <div v-show="spinner" class="spinner">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
  <ul class="lists todo-list">
    <li v-for="list in lists">
      <router-link class="todoLink after" :to="{name: 'todospublic', params: {id: list.url}}">{{list.title}}</router-link>
      <i class="unhide icon see"></i>
    </li>
  </ul>
 <div class="pagination">
   <button class="ui button" @click="previouspage()" :disabled="page < 2 || spinner"><i class="angle left icon"></i></button>
   <label class="ui label">{{page}}</label>
   <button class="ui button" @click="nextpage()" :disabled="lists.length < 1 || spinner"><i class="angle right icon"></i></button>
 </div>
</section>
</template>

<script>
import listsMixin from '../mixins/listsMixin'
import config from '../config'
export default {
  data: function () {
    return {
      page: 1
    }
  },
  methods: {
    previouspage () {
      if (!this.spinner) {
        this.page += -1
        this.spinner = true
        this.$http.get(config.hostname + '/api/lists/unarchived', {params: {page: this.page}}).then(response => {
          this.spinner = false
          this.lists = response.body
        })
      }
    },
    nextpage () {
      if (!this.spinner) {
        this.page += 1
        this.spinner = true
        this.$http.get(config.hostname + '/api/lists/unarchived', {params: {page: this.page}}).then(response => {
          this.spinner = false
          this.lists = response.body
        })
      }
    }
  },
  created: function () {
    this.$http.get(config.hostname + '/api/lists/unarchived').then(response => {
      this.spinner = false
      this.lists = response.body
    })
  },
  mixins: [listsMixin]
}
</script>
