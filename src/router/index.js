import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// PK中
const underway = r => require.ensure([], () => r(require('@/page/PK/underway')), 'underway');

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/underway'
    }, {
      path: '/underway',
      component: underway
    }
  ]
});
