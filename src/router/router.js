import Vue from 'vue'
import Router from 'vue-router'
import addressBook from './address-book';
import my from './my';
import board from './board';
import main from './main';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '@/views/index.vue'),
      children: [
        {
          path: '/',
          redirect: '/main'
        },
        ...board,
        ...addressBook,
        ...my,
        ...main
      ]
    }
  ]
})
