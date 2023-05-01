import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  state: {
    userLoggedIn: null,
    key: null,
    type: null,
    currentUser: {},
    currentLocation: '',
    sitterDetails: {}
  },
  mutations: {
    clearUser (state) {
      state = {}
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
    },
    setCurrentLocation (state, payload) {
      state.currentLocation = payload
    },
    setSitterDetails (state, payload) {
      state.sitterDetails = payload
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
    },
    getCurrentLocation: state => {
      return (state.currentLocation)
    },
    getSitterDetails: state => {
      return (state.sitterDetails)
    }
  },
  plugins: [createPersistedState()]
})

export default store
