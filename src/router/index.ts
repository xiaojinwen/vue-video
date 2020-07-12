import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/home/index.vue';
import Mine from '@/views/mine/index.vue';
import Search from '@/views/search/index.vue';

Vue.use(VueRouter);

// const routes: Array<RouteConfig> = [
const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'search',
        name: 'search',
        component: Search,
      },
    ]
  },
  {
    path: '/mine',
    name: 'mine',
    component: Mine,
  },
  {
    path: '*',
    redirect: '/home'
  },
];

const router = new VueRouter({
  routes,
});

export default router;
