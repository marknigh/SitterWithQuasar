import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      userLoggedIn: null,
      key: null,
      type: null,
      currentUser: {}
    },
    mutations: {
      clearUser (state) {
        state.key = null
        state.userLoggedIn = false
        state.type = null
        state.currentUser = null
      },
      setUserKey (state, payload) {
        state.key = payload
      },
      setUserType (state, payload) {
        state.type = payload
      },
      setUserLoggedIn (state) {
        state.userLoggedIn = true
      },
      setCurrentUser (state, payload) {
        state.currentUser = payload
      }
    },
    getters: {
      getKey: state => {
        return (state.key)
      },
      getType: state => {
        return (state.type)
      },
      getUserLoggedIn: state => {
        return (state.userLoggedIn)
      },
      getCurrentUser: state => {
        return (state.currentUser)
      }
    },
    plugins: [createPersistedState()]
  })

  return Store
}
