import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: 'Login',
  component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
}, {
  path: '/tasks',
  name: 'Tasks',
  component: () => import(/* webpackChunkName: "tasks" */ '../views/Tasks.vue'),
}];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
