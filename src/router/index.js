import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
import welcome from './map/welcome';
import home from './map/home';

let routes = [...welcome,...home];

const router = new Router({
  mode: 'history',
  base: __dirname,
  linkActiveClass: 'active',
  routes
});
export default router
