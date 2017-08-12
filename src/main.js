import 'babel-polyfill';
import Vue from 'vue';
import Vuetify from 'vuetify';
import router from './router';
import store from './store';
import App from './app.vue';

Vue.use(Vuetify);

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>', // 配置根模板 即打开页面显示那个组件
  components: {
    App //  注入组件
  }
});

