<template>
  <header class="header">
    <input type="text" class="new-todo" placeholder="Ajouter une tâche" v-model="newTask" @keyup.enter="addTodo">
  </header>
</template>
