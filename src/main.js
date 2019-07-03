// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/';
import APP from '@APP';

(process.env.BASE_URL == '/api') && process.env.MOCK && require('@/mock');

APP.loadData = (data) => {
  store.dispatch('changeData', data);
};

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
