import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    card: JSON.parse(window.localStorage.getItem('card')) || {},
    user:JSON.parse(window.localStorage.getItem('user')) || {},
    token: ''
  },
  mutations: {
    setCard(state, card) {
			state.card = card
    },
    setUser(state, user){
        state.user = user
    },
    setToken(state, token) {
      state.token = token
    }
  },
  actions: {

  }
})
