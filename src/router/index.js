import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
import quadrant from '../component/quadrant';
import timeline from '../component/timeline';
import statistics from '../component/statistics';
import login from '../component/login';
import { STORAGE_PREFIX } from '../config';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/quadrant' },
    {
      path: '/login',
      name: '登录',
      component: login
    },
    {
      path: '/quadrant/(.*)?',
      name: '四象限视图',
      component: quadrant
    },
    {
      path: '/timeline/(.*)?',
      name: '时间轴视图',
      component: timeline
    },
    {
      path: '/statistics/(.*)?',
      name: '任务统计',
      component: statistics
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  if (to.path !== '/login') {
    const token = localStorage.getItem(`${STORAGE_PREFIX}:token`);
    const result = await axios.get(`/api/check?token=${token}`);
    if (result.data.status === 0) {
      router.replace('/login');
    }
  }
  document.title = `${to.name} | Coding Task`;
  next();
});

export default router;
