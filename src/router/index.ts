import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/home/index.vue';
import Mine from '@/views/mine/index.vue';

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
  },
  {
    path: '/search',
    name: 'search',
    component: Home,
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
