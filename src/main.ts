import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import '@assets/iconfont/iconfont.css';
import VConsole from 'vconsole';
const isDev: boolean = process.env.NODE_ENV !== 'production';
if (isDev) {
  // const vconsole = new VConsole();
}

import { Swipe, SwipeItem, NoticeBar, Popup, Skeleton, Lazyload, Image as VanImage, Icon, Divider, Sticky, Field, Button, Notify } from 'vant';
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(NoticeBar);
Vue.use(Popup);
Vue.use(Skeleton);
Vue.use(Lazyload);
Vue.use(VanImage);
Vue.use(Icon);
Vue.use(Divider);
Vue.use(Sticky);
Vue.use(Field);
Vue.use(Button);
Vue.use(Notify);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
