import Vue from 'vue'
import config from '../config'
export default {
  data: function () {
    return {
      spinner: true
    }
  },
  methods: {
    addTodo () {
      if (this.newTask.length > 0) {
        this.$http.post(config.hostname + '/api/tasks', {description: this.newTask, listId: parseInt(this.$route.params.id), completed: false}).then(response => {
          this.list.Tasks.push(response.body)
        })
        this.newTask = ''
      }
    },
    completeTodo (todo) {
      console.log(todo.id)
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
    cancelEditList () {
      this.editing.title = this.holdTodo
      this.editing = null
    },
    deleteTodo (todo) {
      this.$http.delete(config.hostname + '/api/tasks/' + todo.id).then(response => {
        this.list.Tasks = this.list.Tasks.filter(i => i !== todo)
      })
    },
    deleteCompleted () {
      this.list.Tasks = this.list.Tasks.filter(todo => !todo.completed)
    }
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
  }
}
