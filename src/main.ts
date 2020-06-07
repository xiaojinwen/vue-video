import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import { Swipe, SwipeItem, NoticeBar, Popup, Skeleton, Lazyload, Image as VanImage, Icon, Divider, Sticky } from 'vant';

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
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
