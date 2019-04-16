import Vue from 'vue'
import './cube-ui'
import './plugins/axios'
import App from './App.vue'
import router from './router/router.js'
import store from './store'
import './directives/scroll.js';
import 'lib-flexible';
import fixedButton from '@/components/fixed-button';

Vue.config.productionTip = false
Vue.component('fixed-button', fixedButton);
import './assets/css/main.css'
import './assets/css/my-mint.css';
import apiConfig from './api/apiConfig.js';
Vue.config.productionTip = false
Vue.prototype.$apiConfig=apiConfig;

router.beforeEach((to,from,next)=>{
    console.log(to.meta.title)
    document.title=to.meta.title;
    next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

