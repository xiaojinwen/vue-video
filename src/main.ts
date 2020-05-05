import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import { Swipe, SwipeItem, NoticeBar, Popup } from 'vant';

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(NoticeBar);
Vue.use(Popup);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
