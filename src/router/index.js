import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../views/AboutView.vue';
import Login from '../views/Login.vue';
import Tasks from '../views/Tasks.vue';
import Account from '../views/Account.vue';
import Plants from '../views/Plants.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: Tasks,
    props: true,
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
  },
  {
    path: '/plants',
    name: 'plants',
    component: Plants,
  },
];
const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
