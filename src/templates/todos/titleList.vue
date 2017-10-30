<template>
  <div>
    <input class="edit" type="text" v-model="list.title" @keyup.enter="doneEditList()"  @keyup.esc="cancelEditList" v-focus="list === editing" v-if="editing === list">
    <h1 @dblclick="editList()" :class="{editing: list === editing}" v-else>{{list.title}}</h1>
  </div>
</template>


