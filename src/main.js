import Vue from 'vue'
import './cube-ui'
import './plugins/axios'
import App from './App.vue'
import router from './router/router.js'
import store from './store'
import './directives/scroll.js';
import 'lib-flexible';
import fixedButton from '@/components/fixed-button';
import spUpload from '@/components/upload';
import aloneUpload from '@/components/alone-upload';
import spVideo from '@/components/sp-video';

Vue.config.productionTip = false
Vue.component('fixed-button', fixedButton);
Vue.component('sp-upload', spUpload);
Vue.component('alone-upload', aloneUpload);
Vue.component('sp-video', spVideo);
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

