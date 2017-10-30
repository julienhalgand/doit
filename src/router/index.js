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
    path: '/lists/public/:id',
    components: {
      default: require('../components/Todospublic.vue')
    },
    name: 'todospublic'
  }, {
    path: '/lists/shared/:id',
    components: {
      default: require('../components/SharedList.vue')
    },
    name: 'sharedlist'
  }, {
    path: '/lists/share/:id',
    components: {
      default: require('../components/Todosshare.vue')
    },
    name: 'todosshare'
  }, {
    path: '/archives',
    components: {
      default: Archives
    },
    name: 'archives'
  }, {
    path: '/signin',
    components: {
      default: require('../components/users/Signin.vue')
    },
    name: 'signin'
  }, {
    path: '/signup',
    components: {
      default: require('../components/users/Signup.vue')
    },
    name: 'signup'
  }, {
    path: '/users/confirmation/:token([0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})',
    components: {
      default: require('../components/users/EmailConfirmation.vue')
    },
    name: 'userEmailConfirmation'
  }, {
    path: '/users/forgotpassword',
    components: {
      default: require('../components/users/ForgotPassword.vue')
    },
    name: 'forgotPassword'
  }, {
    path: '/users/profile',
    components: {
      default: require('../components/users/Profile.vue')
    },
    name: 'profile'
  }, {
    path: '/cgu',
    components: {
      default: require('../components/Common.vue')
    },
    name: 'cgu'
  }, {
    path: '*',
    redirect: '/'
  }]
})
