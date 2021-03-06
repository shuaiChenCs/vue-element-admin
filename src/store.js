import Vue from 'vue'
import Vuex from 'vuex'
import SDK from '../public/js/NIM_Web_SDK_v6.4.0';
import im from './lib/im.js';
Vue.use(Vuex)
let card,user;
try {
  card = JSON.parse(sessionStorage.getItem('card')) || {};
} catch (error) {
  card = {};
}
try {
  user = JSON.parse(sessionStorage.getItem('user')) || {};
} catch (error) {
  user = {};
}
export default new Vuex.Store({
  state: {
    group: [],
    card: card,
    user: user,
    token: '',
    nim: null,
    sessions: [],
    userList: [],
    toUser:{},
    mainTop: 0,
    mainActive: ''
  },
  mutations: {
    setMainTop(state, top) {
      state.mainTop = top;
    },
    setGroup(state, arr) {
      state.group = arr;
    },
    setToUser(state, user) {
      state.toUser = user;
    },
    setCard(state, card) {
			state.card = card
    },
    setUser(state, user){
        state.user = user
    },
    setToken(state, token) {
      state.token = token
    },
    initNim(state, user) {
      im.initNim(state, user);
    },
    setSessions(state, sessions) {
      state.sessions = sessions;
    },
    setUserList(state, list) {
      state.userList = list;
    }
  },
  actions: {

  }
})
