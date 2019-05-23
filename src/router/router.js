import Vue from 'vue'
import Router from 'vue-router'
import addressBook from './address-book';
import my from './my';
import board from './board';
import main from './main';
import chat from './chat';

Vue.use(Router)

export default new Router({
    // mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '@/views/index.vue'),
      meta:{title:'首页'},
      children: [
        {
          path: '/',
          redirect: '/main'
        },
        ...board,
        ...addressBook,
        ...my,
        ...main,
        ...chat
      ]
    },
    {
      path: '/article',
      name: 'article',
      component: () => import(/* webpackChunkName: "home" */ '@/views/main/article-detail'),
      meta:{title:'文章'}
    },
      {
          path: '/author',
          name: 'author',
          component: () => import(/* webpackChunkName: "home" */ '@/views/author'),
          meta:{title:'心脉科技'}
      },
    {
      path: '/pay',
      name: 'pay',
      component: () => import(/* webpackChunkName: "pay" */ '../views/pay/pay'),
          meta:{title:'试用已到期'}
    }
  ]
})
