import Vue from 'vue'
import './cube-ui'
import './plugins/axios'
import App from './App.vue'
import router from './router/router.js'
import store from './store'
import './directives/scroll.js';
import 'lib-flexible';
import './lib/common.js';

Vue.config.productionTip = false

import './assets/css/main.css'
import './assets/css/my-mint.css';
import '../public/font/iconfont.css';
import apiConfig from './api/apiConfig.js';
Vue.config.productionTip = false
Vue.prototype.$apiConfig=apiConfig;
Vue.prototype.$hastab;

router.beforeEach((to,from,next)=>{
    Vue.prototype.$hastab = to.meta.hastab;
    document.title=to.meta.title;
    next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

