import Vue from 'vue'
import Vuex from 'vuex'

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'
const FLASH_SET = 'FLASH_SET'
const FLASH_UNSET = 'FLASH_UNSET'
const PERSIST_FLASH = 'PERSIST_FLASH'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),
    isFlashMessage: false,
    flashMessage: 'Merde',
    flashMessageStatus: '',
    persistFlashMessage: false,
    isFormSend: false
  },
  mutations: {
    [LOGIN] (state) {
      state.pending = true
    },
    [LOGIN_SUCCESS] (state) {
      state.isLoggedIn = true
      state.pending = false
    },
    [LOGOUT] (state) {
      state.isLoggedIn = false
    },
    [FLASH_SET] (state, {text, status}) {
      state.isFlashMessage = true
      state.flashMessage = text
      state.flashMessageStatus = status
    },
    [FLASH_UNSET] (state) {
      state.isFlashMessage = false
      state.flashMessage = ''
      state.flashMessageStatus = ''
    },
    [PERSIST_FLASH] (state) {
      if (state.persistFlashMessage) state.persistFlashMessage = false
      else state.persistFlashMessage = true
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn
    },
    isFlashMessage: state => {
      return state.isFlashMessage
    }
  },
  actions: {
    login ({ commit }, creds) {
      commit(LOGIN) // show spinner
      // console.log(creds)
      return new Promise(resolve => {
        localStorage.setItem('token', creds)
        commit(LOGIN_SUCCESS)
        resolve()
      })
    },
    logout ({ commit }) {
      localStorage.removeItem('token')
      commit(LOGOUT)
    },
    unsetFlashMessage ({ commit }) {
      commit(FLASH_UNSET)
    },
    setFlashMessage ({ commit }, {text, status, persist}) {
      if (persist) commit(PERSIST_FLASH)
      commit(FLASH_SET, {text, status})
    },
    persistFlashMessage ({ commit }) {
      commit(PERSIST_FLASH)
    }
  }
})
