<template>
<section>
  <h2>{{list.title}}</h2>
  <section class="todoapp">
    <footer class="footer">
      <span class="todo-count">
        <strong>{{ remaining }}</strong> tâches à faire
      </span>
        <ul class="filters top">
          <li><a href="#" :class="{selected: filter === 'all'}" @click.prevent="filter = 'all'">Toutes</a></li>
          <li><a href="#" :class="{selected: filter === 'todo'}" @click.prevent="filter = 'todo'">À faire</a></li>
          <li><a href="#" :class="{selected: filter === 'done'}" @click.prevent="filter = 'done'">Faites</a></li>
        </ul>
    </footer>
    <header class="header">
      <input type="text" class="new-todo" placeholder="" @click.prevent>
    </header>
    <div class="main">
      <input class="toggle-all" type="checkbox" @click.prevent>
      <ul class="todo-list">
        <li class="todo" v-for="todo in filteredTodos" :class="{completed: todo.completed}">
          <input class="toggle" type="checkbox" @click="completed(todo)" :checked="todo.completed"/>
          <div class="view">
            <label>{{ todo.description }}</label>
          </div>
          <input class="edit" type="text" v-model="todo.description">
        </li>
      </ul>
    </div>
    <footer class="lastfooter footer">
      <span class="todo-count">
        <strong>{{ remaining }}</strong> tâches à faire
      </span>
        <ul class="filters">
          <li><a href="#" :class="{selected: filter === 'all'}" @click.prevent="filter = 'all'">Toutes</a></li>
          <li><a href="#" :class="{selected: filter === 'todo'}" @click.prevent="filter = 'todo'">À faire</a></li>
          <li><a href="#" :class="{selected: filter === 'done'}" @click.prevent="filter = 'done'">Faites</a></li>
        </ul>
    </footer>
  </section>
  <div v-if="spinner" class="spinner">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
  </section>
</template>
<script>
  import todos from '../mixins/todosMixin'
  import config from '../config'
  export default {
    data: function () {
      return {
        list: {
          title: '',
          isPublic: true,
          Tasks: [],
          SharingLists: []
        },
        filter: 'todo'
      }
    },
    created: function () {
      this.$http.get(config.hostname + '/api/lists/public/' + this.$route.params.id).then(response => {
        this.spinner = false
        if (response.body) {
          this.list = response.body
          if (typeof this.list.Tasks === 'undefined') this.list.Tasks = []
        }
      }).catch((errors) => {
        console.log(errors)
      })
    },
    methods: {
      completed (todo) {
        if (todo.completed) todo.completed = false
        else todo.completed = true
      }
    },
    computed: {
      remaining () { return this.list.Tasks.filter(todo => !todo.completed).length },
      doneTodo () { return this.list.Tasks.filter(todo => todo.completed).length },
      filteredTodos () {
        if (this.filter === 'todo') {
          return this.list.Tasks.filter(todo => !todo.completed)
        } else if (this.filter === 'done') {
          return this.list.Tasks.filter(todo => todo.completed)
        }
        return this.list.Tasks
      },
      hasTodo () {
        return this.list.Tasks.length
      }
    },
    mixins: [todos]
  }
</script>
