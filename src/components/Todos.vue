<template>
  <section class="todoapp">
    <header class="header">
      <h1>Todos</h1>
      <input type="text" class="new-todo" placeholder="Ajouter une tâche" v-model="newTodo" @keyup.enter="addTodo">
    </header>
    <div class="main">
      <input class="toggle-all" type="checkbox" v-model="allDone">
      <ul class="todo-list">
        <li class="todo" v-for="todo in filteredTodos" :class="{completed: todo.completed, editing: todo === editing}">
          <input class="toggle" type="checkbox" v-model="todo.completed">
          <div class="view">
            <label @dblclick="editTodo(todo)">{{ todo.name }}</label>
            <button class="destroy" @click.prevent="deleteTodo(todo)"></button>
          </div>
          <input class="edit" type="text" v-model="todo.name" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" v-focus="todo === editing" @blur="doneEdit">
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
      <button class="clear-completed" v-show="doneTodo" @click.prevent="deleteCompleted">Supprimer les tâches terminées</button>
    </footer>
  </section>
</template>

<script>
    import Vue from 'vue'
    export default {
      data () {
        return {
          todos: [{
            name: 'Tache de test',
            completed: false
          }],
          newTodo: '',
          filter: 'all',
          editing: null,
          holdTodo: ''
        }
      },
      methods: {
        addTodo () {
          this.todos.push({
            completed: false,
            name: this.newTodo
          })
          this.newTodo = ''
        },
        editTodo (todo) {
          this.editing = todo
          this.holdTodo = todo.name
        },
        doneEdit () {
          this.editing = null
        },
        cancelEdit () {
          this.editing.name = this.holdTodo
          this.doneEdit()
        },
        deleteTodo (todo) {
          this.todos = this.todos.filter(i => i !== todo)
        },
        deleteCompleted () {
          this.todos = this.todos.filter(todo => !todo.completed)
        }
      },
      computed: {
        allDone: {
          get () {
            return this.remaining === 0
          },
          set (value) {
            this.todos.forEach(todo => {
              todo.completed = value
            })
          }
        },
        remaining () { return this.todos.filter(todo => !todo.completed).length },
        doneTodo () { return this.todos.filter(todo => todo.completed).length },
        filteredTodos () {
          if (this.filter === 'todo') {
            return this.todos.filter(todo => !todo.completed)
          } else if (this.filter === 'done') {
            return this.todos.filter(todo => todo.completed)
          }
          return this.todos
        },
        hasTodo () {
          return this.todos.length
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

<style src="./todos.css">

</style>
