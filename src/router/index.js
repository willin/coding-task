import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
import quadrant from './quadrant';
import timeline from './timeline';
import statistics from './statistics';
import statisticsIndex from './statistics/default.vue';
import statisticsTeam from './statistics/team.vue';
import statisticsProject from './statistics/project.vue';
import statisticsUser from './statistics/user.vue';
import login from './login';
import { STORAGE_PREFIX } from '../config';
// import actions from '../store/actions';

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
      path: '/quadrant',
      name: '四象限视图',
      component: quadrant
    },
    {
      path: '/timeline',
      name: '时间轴视图',
      component: timeline
    },
    {
      path: '/statistics',
      component: statistics,
      children: [
        {
          path: '',
          name: '统计首页',
          component: statisticsIndex
        },
        {
          path: 'team',
          name: '团队统计',
          component: statisticsTeam
        },
        {
          path: 'project',
          name: '项目统计',
          component: statisticsProject
        },
        {
          path: 'user',
          name: '用户统计',
          component: statisticsUser
        }
      ]
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
