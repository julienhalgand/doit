import config from '../config'
export default {
  data: function () {
    return {
      title: '',
      isPublic: true,
      privacyArray: [
        {text: 'Publique', value: true},
        {text: 'Privé', value: false}
      ],
      spinner: true,
      lists: []
    }
  },
  methods: {
    addList () {
      if (this.title.length > 0) {
        this.$http.post(config.hostname + '/api/lists', {title: this.title, isPublic: this.isPublic}).then(response => {
          this.$store.dispatch('setFlashMessage', {text: 'Liste créé avec succès !', status: 'success', persist: true})
          this.$router.push({name: 'todos', params: response.body})
        })
        this.title = ''
      }
    },
    archiveList (list) {
      if (list.archived) list.archived = false
      else if (!list.archived) list.archived = true
      this.$http.put(config.hostname + '/api/lists/' + list.id, list).then(response => {
      })
    },
    deleteList (list) {
      this.$dialog.confirm('Confirmez la suppression de "' + list.title + '" ?').then(() => {
        this.$http.delete(config.hostname + '/api/lists/' + list.id).then(response => {
          this.lists = this.lists.filter(i => i !== list)
        })
      })
    }
  },
  computed: {
    hasList () {
      if (this.lists.length > 0) true
      else false
    }
  }
}
