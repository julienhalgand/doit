<template>
<section>
  <input class="edit" type="text" v-model="list.title" @keyup.enter="doneEditList()"  @keyup.esc="cancelEditList" v-focus="list === editing" v-if="editing === list">
  <h2 @dblclick="editList()" :class="{editing: list === editing}" v-else>{{list.title}}</h2>
  <form class="ui form">
  </form>
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
      <button class="clear-completed" v-show="false" @click.prevent="deleteCompleted">Supprimer les tâches terminées</button>
    </footer>
    <header class="header">
      <input type="text" class="new-todo" placeholder="Ajouter une tâche" v-model="newTask" @keyup.enter="addTodo">
    </header>
    <div class="main">
      <input class="toggle-all" type="checkbox" v-model="allDone">
      <ul class="todo-list">
        <draggable :list="filteredTodos" @start="onStart" @end="onEnd">
          <li class="todo" :id="todo.id" v-for="todo in filteredTodos" :class="{completed: todo.completed, editing: todo === editing}">
            <input class="toggle" type="checkbox" :id="todo.id" @click="completeTodo(todo)" v-model="todo.completed"/>
            <div class="view">
              <label @dblclick="editTodo(todo)">{{ todo.description }}</label>
              <button class="destroy" @click.prevent="deleteTodo(todo)"></button>
            </div>
            <input class="edit" type="text" v-model="todo.description" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit" v-focus="todo === editing" @blur="doneEdit">
          </li>
        </draggable>
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
      <button class="clear-completed" v-show="false" @click.prevent="deleteCompleted">Supprimer les tâches terminées</button>
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
  import Vue from 'vue'
  import todos from '../mixins/todosMixin'
  import draggable from 'vuedraggable'
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
        newTask: '',
        filter: 'todo',
        editing: null,
        holdTodo: '',
        spinner: true,
        renewLoading: false,
        hostname: config.website
      }
    },
    methods: {
      addTodo () {
        if (this.newTask.length > 0) {
          this.$http.post(config.hostname + '/api/tasks', {description: this.newTask, listId: parseInt(this.$route.params.id), position: this.list.Tasks.length + 1, completed: false}).then(response => {
            this.list.Tasks.push(response.body)
          })
          this.newTask = ''
        }
      },
      completeTodo (todo) {
        this.$http.put(config.hostname + '/api/tasks/' + todo.id, todo).then((response) => {
          console.log(response)
        })
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
          this.$http.put(config.hostname + '/api/tasks/' + todo.id, todo)
        }
        this.editing = null
      },
      cancelEdit () {
        this.editing.description = this.holdTodo
        this.editing = null
      },
      doneEditList (todo) {
        this.editing = null
        this.$http.put(config.hostname + '/api/lists/' + this.list.id, {title: this.list.title})
      },
      editPrivacy () {
        this.$http.put(config.hostname + '/api/lists/' + this.list.id, {isPublic: this.list.isPublic})
      },
      cancelEditList () {
        this.editing.title = this.holdTodo
        this.editing = null
      },
      deleteTodo (todo) {
        this.$http.delete(config.hostname + '/api/tasks/' + todo.id, {listId: this.list.id}).then(response => {
          this.list.Tasks = this.list.Tasks.filter(i => i !== todo)
        })
      },
      deleteCompleted () {
        this.list.Tasks = this.list.Tasks.filter(todo => !todo.completed)
      },
      generateLink: () => {
        return config.hostname + '/share/'
      },
      renewSharingLink: function (sharinglink) {
        this.renewLoading = true
        this.$http.patch(config.hostname + '/api/sharinglink/renew/' + sharinglink.url).then(response => {
          if (response.body) {
            this.list.SharingLinks = [response.body]
            this.renewLoading = false
            this.$store.dispatch('setFlashMessage', {text: 'Lien renouvelé avec succès, l\'ancien ne pourra plus servir à ajouter des collaborateurs.', status: 'success'})
          }
        }).catch((errors) => {
          console.log(errors)
        })
      },
      onCopy: function (e) {
        this.$store.dispatch('setFlashMessage', {text: 'Lien copier dans le presse papier avec succès !', status: 'success'})
      },
      onError: function (e) {
        this.$store.dispatch('setFlashMessage', {text: 'Erreur lors de la copie du texte dans le presse papier !', status: 'errors'})
      },
      onStart () {
        if (this.filter !== 'all') this.$store.dispatch('setFlashMessage', {text: 'Vous devez afficher toutes les tâches pour pouvoir les déplacer.', status: 'errors'})
        else {
          this.oldFilter = this.filter
          this.filter = 'all'
        }
      },
      onEnd (e, todo) {
        if (this.filter !== 'all') this.$store.dispatch('setFlashMessage', {text: 'Vous devez afficher toutes les tâches pour pouvoir les déplacer.', status: 'errors'})
        else {
          var taskId = e.clone.id
          var indexMove = this.findTaskIndexInList(taskId)
          this.$http.patch(config.hostname + '/api/lists/position/' + this.list.id, {taskId: taskId, moveOf: indexMove}).then(response => {
            console.log(response)
          })
        }
      },
      sortingTasks () {
        this.list.Tasks.sort(function (a, b) {
          return parseFloat(a.position) - parseFloat(b.position)
        })
      },
      moveElementOfArray (taskId, indexMove) {
        var actualIndex = this.findTaskIndexInList(taskId)
        var newIndex = actualIndex + indexMove
        var oldIndex = actualIndex
        if (newIndex >= this.list.Tasks.length) {
          var k = newIndex - this.list.Tasks.length
          while ((k--) + 1) {
            this.list.Tasks.push(undefined)
          }
        }
        this.list.Tasks.splice(newIndex, 0, this.list.Tasks.splice(oldIndex, 1)[0])
      },
      findTaskIndexInList (taskId) {
        return this.list.Tasks.findIndex(function (taskInList) {
          return taskInList.id === parseInt(taskId)
        })
      },
      findTaskInList (taskId) {
        return this.list.Tasks.find(function (taskInList) {
          return taskInList.id === parseInt(taskId)
        })
      }
    },
    created: function () {
      this.$http.get(config.hostname + '/api/lists/shared/' + this.$route.params.id).then(response => {
        this.spinner = false
        if (response.body) {
          this.list = response.body
          console.log(this.list)
        }
      }).catch((errors) => {
        console.log(errors)
      })
    },
    components: {
      draggable
    },
    computed: {
      allDone: {
        get () {
          return this.remaining === 0
        },
        set (value) {
          this.list.Tasks.forEach(todo => {
            todo.completed = value
            this.$http.put(config.hostname + '/api/tasks/' + todo.id, todo)
          })
        }
      },
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
    directives: {
      focus (el, value) {
        if (value) {
          Vue.nextTick(_ => {
            el.focus()
          })
        }
      }
    },
    mixins: [todos]
  }
</script>
