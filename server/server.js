const Koa = require('koa');
const Router = require('koa-router');
const { model: { User, Team, Project, Task, Label, TaskLabels } } = require('../server/model');
const { getAccessToken, getCurrentUser, getTeams } = require('./lib/api');
const { defaults: { admin }, teams } = require('./config');
const redis = require('./lib/redis');

const app = new Koa();
const router = new Router();

router.get('/coding/callback', async (ctx) => {
  const code = ctx.query.code;
  const token = await getAccessToken({ code });
  if (token === undefined) {
    ctx.redirect('/login?500');
    return;
  }
  // 判断是否能够登录
  const team = await getTeams({ accessToken: token.access_token });
  let canLogin = false;
  for (let i = 0; i < team.length; i += 1) {
    if (teams.includes(team[i].global_key)) {
      canLogin = true;
      break;
    }
  }
  if (canLogin) {
    // 获取用户名
    const user = await getCurrentUser({ accessToken: token.access_token });
    if (user.global_key === admin) {
      await redis.setex('access_token', 86300, token.access_token);
      await redis.setex('refresh_token', 86300, token.refresh_token);
    }
    // 登录成功跳转
    ctx.redirect('/');
    return;
  }
  // 登录失败跳转
  ctx.redirect('/login?fail');
});

router.get('/user', async (ctx) => {
  const data = await User.findAll({
    raw: true
  });
  ctx.body = {
    status: 1,
    data
  };
});

router.get('/team', async (ctx) => {
  const data = await Team.findAll({
    raw: true
  });
  ctx.body = {
    status: 1,
    data
  };
});

router.get('/project', async (ctx) => {
  const data = await Project.findAll({
    raw: true
  });
  ctx.body = {
    status: 1,
    data
  };
});

router.get('/task', async (ctx) => {
  const data = await Task.findAll({
    raw: true
  });
  ctx.body = {
    status: 1,
    data
  };
});

router.get('/label', async (ctx) => {
  const data = await Label.findAll({
    raw: true
  });
  ctx.body = {
    status: 1,
    data
  };
});

router.get('/tasklabels', async (ctx) => {
  const data = await TaskLabels.findAll({
    raw: true
  });
  ctx.body = {
    status: 1,
    data
  };
});

// 示例代码: 供后续优化拆分参考, 但这样的两个接口设计会产生大量冗余请求. 需要重新设计接口及参数.
// router.get('/task/:taskid/labels', async (ctx) => {
//   const taskid = ctx.params.taskid;
//   const data = await TaskLabels.findAll({
//     where: {
//       task_id: taskid
//     },
//     raw: true
//   });
//   ctx.body = {
//     status: 1,
//     data: data.map(x => x.label_id)
//   };
// });

// router.get('/label/:labelid/tasks', async (ctx) => {
//   const labelid = ctx.params.labelid;
//   const data = await TaskLabels.findAll({
//     where: {
//       label_id: labelid
//     },
//     raw: true
//   });
//   ctx.body = {
//     status: 1,
//     data: data.map(x => x.task_id)
//   };
// });


app.use(router.routes()).use(router.allowedMethods());

module.exports = app;
