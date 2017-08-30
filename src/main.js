import Vue from 'vue';
import i18n from './i18n';
// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = true;
Vue.config.devtools = true;


import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.inc(0.5)
NProgress.configure({
  easing: 'ease',
  speed: 500
    // showSpinner: false
})
import router from 'router/';
import 'register/';
import store from 'store/';

//bel-table
import BelTable from 'vue-bel-table'
Vue.use(BelTable);

router.beforeEach((to, from, next) => {
  window.scroll(0, 0);
  console.log('user', store.state.user.userinfo);
  if (!store.state.user.userinfo.user_id && to.path !== '/login') {
    store.dispatch('remove_userinfo');
    next('/login');
  } else {
    if (store.state.user.userinfo.user_id && to.path === '/login') {
      next({
        path: '/home/user'
      });
    } else {
      NProgress.start();
      next();
    }
  }
})

router.afterEach(transition => {
  console.log('1234');
  NProgress.done();
});

import App from './App';
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})