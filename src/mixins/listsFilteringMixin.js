export default {
  data: function () {
    return {
      filter: 'todo',
      editing: null,
      holdTodo: ''
    }
  },
  computed: {
    remaining () { return this.lists.filter(list => !list.archived).length },
    doneTodo () { return this.lists.filter(list => list.archived).length },
    filteredLists () {
      if (this.filter === 'todo') {
        return this.lists.filter(list => !list.archived)
      } else if (this.filter === 'public') {
        return this.lists.filter(list => list.public)
      } else if (this.filter === 'private') {
        return this.lists.filter(list => !list.public)
      } else if (this.filter === 'archived') {
        return this.lists.filter(list => list.archived)
      } else if (this.filter === 'collaborations') {
        return this.user.Collaborations
      }
      return this.lists
    }
  }
}
