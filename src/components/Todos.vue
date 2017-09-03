<template>
<section>
  <input class="edit" type="text" v-model="list.title" @keyup.enter="doneEditList()"  @keyup.esc="cancelEditList" v-focus="list === editing" v-if="editing === list">
  <h1 @dblclick="editList()" :class="{editing: list === editing}" v-else>{{list.title}}</h1>
  <section class="todoapp">
    <header class="header">
      <input type="text" class="new-todo" placeholder="Ajouter une tâche" v-model="newTask" @keyup.enter="addTodo">
    </header>
    <div class="main">
      <input class="toggle-all" type="checkbox" v-model="allDone">
      <ul class="todo-list">
        <li class="todo" v-for="todo in filteredTodos" :class="{completed: todo.completed, editing: todo === editing}">
          <input class="toggle" type="checkbox" @click="completeTodo(todo)"  v-model="todo.completed"/>
          <div class="view">
            <label @dblclick="editTodo(todo)">{{ todo.description }}</label>
            <button class="destroy" @click.prevent="deleteTodo(todo)"></button>
          </div>
          <input class="edit" type="text" v-model="todo.description" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit" v-focus="todo === editing" @blur="doneEdit">
        </li>
      </ul>
    </div>
    <footer class="footer" v-show="hasTodo">
      <span class="todo-count">
        <strong>{{ remaining }}</strong> tâches à faire
      </span>
        <ul class="filters">
          <li><a href="#" :class="{selected: filter === 'all'}" @click.prevent="filter = 'all'">Toutes</a></li>
          <li><a href="#" :class="{selected: filter === 'todo'}" @click.prevent="filter = 'todo'">À faire</a></li>
          <li><a href="#" :class="{selected: filter === 'done'}" @click.prevent="filter = 'done'">Faites</a></li>
        </ul>
      <button class="clear-completed" v-show="false" @click.prevent="deleteCompleted">Supprimer les tâches terminées</button>
    </footer>
  </section>
  </section>
</template>

<script>
    import Vue from 'vue'
    import config from '../config'
    export default {
      data: function () {
        return {
          list: {
            title: '',
            tasks: []
          },
          newTask: '',
          filter: 'all',
          editing: null,
          holdTodo: ''
        }
      },
      created: function () {
        this.$http.get(config.hostname + '/lists/' + this.$route.params.id + '?_embed=tasks').then(response => {
          this.list = response.body
        })
      },
      methods: {
        addTodo () {
          if (this.newTask.length > 0) {
            this.$http.post(config.hostname + '/tasks', {description: this.newTask, listId: parseInt(this.$route.params.id), completed: false}).then(response => {
              this.list.tasks.push(response.body)
            })
            this.newTask = ''
          }
        },
        completeTodo (todo) {
          this.$http.put(config.hostname + '/tasks/' + todo.id, todo)
        },
        editTodo (todo) {
          this.editing = todo
          this.holdTodo = todo.description
        },
        editList () {
          this.editing = this.list
          this.holdTodo = this.list.title
        },
        doneEdit (todo) {
          if (todo === this.editing) {
            this.$http.put(config.hostname + '/tasks/' + todo.id, todo)
          }
          this.editing = null
        },
        cancelEdit () {
          this.editing.description = this.holdTodo
          this.editing = null
        },
        doneEditList (todo) {
          this.editing = null
          this.$http.put(config.hostname + '/lists/' + this.list.id, {title: this.list.title})
        },
        cancelEditList () {
          this.editing.title = this.holdTodo
          this.editing = null
        },
        deleteTodo (todo) {
          this.$http.delete(config.hostname + '/tasks/' + todo.id).then(response => {
            this.list.tasks = this.list.tasks.filter(i => i !== todo)
          })
        },
        deleteCompleted () {
          this.list.tasks = this.list.tasks.filter(todo => !todo.completed)
        }
      },
      computed: {
        allDone: {
          get () {
            return this.remaining === 0
          },
          set (value) {
            this.list.tasks.forEach(todo => {
              todo.completed = value
            })
          }
        },
        remaining () { return this.list.tasks.filter(todo => !todo.completed).length },
        doneTodo () { return this.list.tasks.filter(todo => todo.completed).length },
        filteredTodos () {
          if (this.filter === 'todo') {
            return this.list.tasks.filter(todo => !todo.completed)
          } else if (this.filter === 'done') {
            return this.list.tasks.filter(todo => todo.completed)
          }
          return this.list.tasks
        },
        hasTodo () {
          return this.list.tasks.length
        }
      },
      directives: {
        focus (el, value) {
          if (value) {
            Vue.nextTick(_ => {
              el.focus()
            })
          }
        }
      }
    }
</script>
