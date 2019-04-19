
import Vue from 'vue';
import WX from 'weixin-js-sdk';

let Plugin = {};
Plugin.install = function(Vue, options) {
    Vue.WX = WX;
    window.WX = WX;
    Object.defineProperties(Vue.prototype, {
      WX: {
        get() {
          return WX;
        }
      },
      $WX: {
        get() {
          return WX;
        }
      },
    });
  };
  
  Vue.use(Plugin)
  
  export default Plugin;