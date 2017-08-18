import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: require('../components/Hello.vue'),
    name: 'root'
  }, {
    path: '/a',
    component: require('../components/PageA.vue'),
    name: 'a'
  }, {
    path: '/article/:id(\\d+)',
    components: {
      default: require('../components/PageC.vue'),
      sidebar: require('../components/PageA.vue')
    }
  }, {
    path: '*',
    redirect: '/'
  }]
})
