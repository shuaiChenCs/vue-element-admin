import Vue from 'vue'
import fixedButton from '@/components/fixed-button';
import spUpload from '@/components/upload';
import aloneUpload from '@/components/alone-upload';
import spVideo from '@/components/sp-video';
import spReply from '@/components/reply';
import card from '@/components/card';
import noMore from '@/components/no-more';
import noData from '@/components/no-data';

Vue.component('fixed-button', fixedButton);
Vue.component('sp-upload', spUpload);
Vue.component('alone-upload', aloneUpload);
Vue.component('sp-video', spVideo);
Vue.component('sp-reply', spReply);
Vue.component('sp-card', card);
Vue.component('no-more', noMore);
Vue.component('no-data', noData);