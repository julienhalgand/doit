// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VuejsDialog from 'vuejs-dialog'
import router from './router'
import store from './store'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
Vue.config.productionTip = false
Vue.use(VueResource)
Vue.http.interceptors.push(function (request, next) {
  if (store.getters.isLoggedIn) {
    request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  }
  next(function (response) {
    if (response.status === 401) {
      if (store.getters.isLoggedIn) {
        router.push({name: 'homepage'})
      } else {
        router.push({name: 'signin'})
      }
    }
    if (response.status === 404) {
      router.push({name: 'homepage'})
    }
    if (response.status === 403) {
      router.push({name: 'homepage'})
    }
  })
})
Vue.use(VuejsDialog, {
  okText: 'Supprimer',
  cancelText: 'Annuler'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
