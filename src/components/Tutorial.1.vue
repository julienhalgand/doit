<template>
<section>
<h2>Tutoriels</h2>
<div class="ui three item menu pointing">
  <a class="item" :class="{active: activeTutorial === 'lists'}" @click.prevent="activeTutorial = 'lists'">Créer une liste de tâches</a>
  <a class="item" :class="{active: activeTutorial === 'tasks'}" @click.prevent="activeTutorial = 'tasks'">Gestion des tâches</a>
  <a class="item" :class="{active: activeTutorial === 'collaboration'}" @click.prevent="activeTutorial = 'collaboration'">Ajouter des collaborateurs</a>
</div>
<div class="ui bottom attached segment">
  <p>
    <profil if="{activeTutorial === profil}"></profil>
  </p>
</div>
</section>
</template>

<script>
  import lists from '../templates/tutorials/lists.vue'
  import tasks from '../templates/tutorials/tasks.vue'
  import collaborations from '../templates/tutorials/collaborations.vue'
  export default {
    data: () => {
      return {
        activeTutorial: 'lists'
      }
    },
    components: {
      lists, tasks, collaborations
    }
  }
</script>
