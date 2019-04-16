import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    card: {},
    user:{},
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
