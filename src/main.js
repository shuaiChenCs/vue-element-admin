import Vue from 'vue'
import './cube-ui'
import './plugins/axios'
import './lib/wxjssdk'
import App from './App.vue'
import router from './router/router.js'
import store from './store'
import './lib/filter.js';
import './directives/scroll.js';
import 'lib-flexible';
import './lib/common.js';
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard);

Vue.config.productionTip = false
import './assets/css/main.css'
import './assets/css/my-mint.css';
import '../public/font/iconfont.css';
import apiConfig from './api/apiConfig.js';
Vue.config.productionTip = false
Vue.prototype.$apiConfig=apiConfig;
Vue.prototype.$imageUrl = 'https://images.sipinoffice.com/miniProgram/images';
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

