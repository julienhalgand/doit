<template>
  <div class="ui">
    <div class="column">
    <h1>Profile</h1>
    <ul>
      <li>{{user.firstname}}</li>
      <li>{{user.lastname}}</li>
      <li>{{user.createdAt}}</li>
    </ul>
    </div>
  <section>
  <h1>Vos listes de tâches</h1>
  <input type="text" class="new-todo" placeholder="Saisir le titre d'une liste de tâche" v-model="title" @keyup.enter="addList">
  <footer class="footer">
      <ul class="filters">
        <li><a href="#" @click="addList">Créer</a></li>
      </ul>
  </footer>
  <div v-show="spinner" class="spinner">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
  <ul class="lists todo-list">
    <li v-for="list in filteredLists">
      <router-link class="todoLink after" :to="{name: 'todos', params: {id: list.id}}" v-if="filter != 'collaborations'">{{list.title}}</router-link>
      <router-link class="todoLink after" :to="{name: 'sharedlist', params: {id: list.id}}" v-else>{{list.title}}</router-link>
      <button class="destroy" @click.prevent="deleteList(list)" title="Supprimer" v-if="filter != 'collaborations'"></button>
      <button class="destroy" @click.prevent="deleteCollaboration(list)" title="Supprimer" v-else></button>
      <button class="archived" @click.prevent="archiveList(list)" title="Archiver" v-if="filter != 'collaborations'"><img width="40px" src="/static/images/archiver_icone.svg"></button>
    </li>
  </ul>
  <footer class="footer">
    <span class="todo-count">
      <strong>{{ remaining }}</strong> listes à terminer
    </span>
    <ul class="filters top">
      <li><a href="#" :class="{selected: filter === 'all'}" @click.prevent="filter = 'all'">Toutes</a></li>
      <li><a href="#" :class="{selected: filter === 'collaborations'}" @click.prevent="filter = 'collaborations'">Collaborations</a></li>
      <li><a href="#" :class="{selected: filter === 'todo'}" @click.prevent="filter = 'todo'">À faire</a></li>
      <li><a href="#" :class="{selected: filter === 'public'}" @click.prevent="filter = 'public'">Public</a></li>
      <li><a href="#" :class="{selected: filter === 'private'}" @click.prevent="filter = 'private'">Privés</a></li>
      <li><a href="#" :class="{selected: filter === 'archived'}" @click.prevent="filter = 'archived'">Archives</a></li>
    </ul>
  </footer>
</section>
  </div>
</template>

<script>
  import config from '../../config'
  import listsMixin from '../../mixins/listsMixin'
  import listsFilteringMixin from '../../mixins/listsFilteringMixin'
  export default {
    data: () => {
      return {
        user: {
          firstname: '',
          lastname: '',
          createdAt: '',
          updatedAt: ''
        }
      }
    },
    created: function () {
      if (this.$store.getters.isLoggedIn) {
        this.$http.get(config.hostname + '/api/users/profile').then(response => {
          this.user = response.body
          this.lists = response.body.Lists
          this.spinner = false
        })
      } else {
        this.$router.push({name: 'signin'})
      }
    },
    methods: {
      deleteCollaboration (list) {
        this.$http.patch(config.hostname + '/api/lists/stopcollaboration/' + list.id).then(response => {
          this.user.Collaborations = this.user.Collaborations.filter(i => i !== list)
        })
      }
    },
    mixins: [listsMixin, listsFilteringMixin]
  }
</script>
