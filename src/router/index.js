import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// PK中
const underway = r => require.ensure([], () => r(require('@/page/PK/underway')), 'underway');
// PK详情
const detail = r => require.ensure([], () => r(require('@/page/PK/detail')), 'detail');
// PK结果
const result = r => require.ensure([], () => r(require('@/page/PK/result')), 'result');

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/underway'
    }, {
      path: '/underway',
      component: underway
    }, {
      path: '/detail',
      component: detail
    }, {
      path: '/result',
      component: result
    }
  ]
});
