import Vue from 'vue'
import './cube-ui'
import './plugins/axios'
import App from './App.vue'
import router from './router/router.js'
import store from './store'
import './assets/css/main.css'
import {post,fetch,del,put} from './api/http';

Vue.config.productionTip = false
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$del=del;
Vue.prototype.$put=put;

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

