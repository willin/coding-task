import Vue from 'vue';
import Router from 'vue-router';
import quadrant from '../component/quadrant';
import timeline from '../component/timeline';
import statistics from '../component/statistics';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/quadrant' },
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

router.beforeEach((to, from, next) => {
  document.title = to.name;
  next();
});

export default router;
