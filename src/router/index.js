import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('../components/Home.vue')
const Todos = () => import('../components/Todos.vue')
const Archives = () => import('../components/Archives.vue')

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    components: {
      default: Home
    },
    name: 'homepage'
  }, {
    path: '/lists/:id',
    components: {
      default: Todos
    },
    name: 'todos'
  }, {
    path: '/archives',
    components: {
      default: Archives
    },
    name: 'archives'
  }, {
    path: '*',
    redirect: '/'
  }]
})
