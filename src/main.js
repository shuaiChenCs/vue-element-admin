import Vue from 'vue'
import './cube-ui'
import './plugins/axios'
import App from './App.vue'
import router from './router/router.js'
import store from './store'
import './assets/css/main.css'

Vue.config.productionTip = false

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

