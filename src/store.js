import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    card: {},
    token: ''
  },
  mutations: {
    setCard(state, card) {
			state.card = card
    },
    setToken(state, token) {
      state.token = token
    }
  },
  actions: {

  }
})
