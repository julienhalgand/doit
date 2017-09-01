<template>
<section>
  <input type="text" class="new-todo" placeholder="Saisir le titre d'une liste de tâche" v-model="title" @keyup.enter="addList">
  <footer class="footer">
      <ul class="filters">
        <li><a href="#" @click="addList">Créer</a></li>
        <li><a href="#">Rechercher</a></li>
      </ul>
  </footer>
</section>
</template>

<script>
export default {
  data: function () {
    return {
      title: ''
    }
  },
  methods: {
    addList () {
      if (this.title.length > 0) {
          // POST /someUrl
        this.$http.post('http://localhost:4000/lists', {list: {title: this.title}}).then(response => {
          // get body data
          this.$router.push({name: 'todos', params: response.body})
        },
        response => {
          // error callback
        })
        this.title = ''
      }
    }
  }
}
</script>
        /* var xhttp = new XMLHttpRequest()

        xhttp.open('POST', 'http://localhost:4000/lists', true)
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        xhttp.onreadystatechange = function (event) {
          if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
              console.log('Réponse reçu: %s', this.responseText)
            } else {
              console.log('Status de la réponse: %d (%s)', this.status, this.statusText)
            }
          }
        }
        xhttp.send('list[title]=' + this.title)*/
