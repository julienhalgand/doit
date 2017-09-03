import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    components: {
      default: require('../components/Home.vue')
    },
    name: 'homepage'
  }, {
    path: '/lists/:id',
    components: {
      default: require('../components/Todos.vue')
    },
    name: 'todos'
  }, {
    path: '*',
    redirect: '/'
  }]
})
