<template>
<section>
  <h2>Bienvenue</h2>
  <div class="ui piled segment pagination">
    <h4>Organisez vous grâce à DOIT</h4>
    <p>Créer des listes de tâches en quelques clics. C'est facile et gratuit.</p>
    <p><router-link :to="{name: 'tutorial'}" class="ui button pink">Je découvre comment</router-link></p>
  </div>
  <div v-show="spinner" class="spinner">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
  <div class="ui">
    <h4><i class="angle down icon"></i>Découvrez les dernières listes publiés par nos utilisateurs<i class="angle down icon"></i></h4>
  </div>
  <ul class="lists todo-list">
      <li v-for="list in lists">
        <router-link class="todoLink after" :to="{name: 'todospublic', params: {id: list.url}}">{{list.title}}</router-link>
        <i class="unhide icon see" @click="gotopubliclist(list)"></i>
      </li>
    </ul>
    <div class="pagination">
      <button class="ui button" @click="previouspage()" :disabled="page < 2 || spinner"><i class="angle left icon"></i></button>
      <label class="ui label">{{page}}</label>
      <button class="ui button" @click="nextpage()" :disabled="lists.length < 9 || spinner"><i class="angle right icon"></i></button>
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
    },
    gotopubliclist (list) {
      this.$router.push({name: 'todospublic', params: {id: list.url}})
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
