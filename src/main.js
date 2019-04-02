import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router/router.js'
import store from './store'
import Mint from 'mint-ui';
import './assets/css/main.css'
import 'mint-ui/lib/style.css'
import './assets/css/my-mint.css'
Vue.use(Mint);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
