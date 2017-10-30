<template>
  <div>
    <span class="todo-count">
      <strong>{{ remaining }}</strong> tâches à faire
    </span>
    <ul class="filters top">
      <li><a href="#" :class="{selected: filter === 'all'}" @click.prevent="filter = 'all'">Toutes</a></li>
      <li><a href="#" :class="{selected: filter === 'todo'}" @click.prevent="filter = 'todo'">À faire</a></li>
      <li><a href="#" :class="{selected: filter === 'done'}" @click.prevent="filter = 'done'">Faites</a></li>
    </ul>
    <button class="clear-completed" v-show="false" @click.prevent="deleteCompleted">Supprimer les tâches terminées</button>
  </div>
</template>
