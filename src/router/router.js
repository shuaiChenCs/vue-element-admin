import Vue from 'vue'
import Router from 'vue-router'
import addressBook from './address-book';
import my from './my';
import board from './board';
import main from './main';
import chat from './chat';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '@/views/index.vue'),
      meta:{title:'首页'},
      children: [
        {
          path: '/',
          redirect: '/board'
        },
        ...board,
        ...addressBook,
        ...my,
        ...main,
        ...chat
      ]
    }
  ]
})
