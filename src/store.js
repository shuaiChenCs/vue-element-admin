import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let card,user;
try {
  card = JSON.parse(localStorage.getItem('card')) || {};
} catch (error) {
  card = {};
}
try {
  user = JSON.parse(localStorage.getItem('user')) || {};
} catch (error) {
  user = {};
}
export default new Vuex.Store({
  state: {
    card: card,
    user: user,
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
