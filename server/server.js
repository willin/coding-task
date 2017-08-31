const Koa = require('koa');
const Router = require('koa-router');
const { model: { User, Team, Project, Task, Label, TaskLabels } } = require('./model');
const { getAccessToken, getCurrentUser, getTeams } = require('./lib/api');
const { defaults: { admin }, teams } = require('./config');
const { setToken } = require('./lib/token');

const app = new Koa();
const router = new Router();

router
  .get('/coding/callback', async (ctx) => {
    const code = ctx.query.code;
    const token = await getAccessToken({ code });
    if (token === undefined) {
      ctx.redirect('/login?result=500');
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
        await setToken(token);
      }
      // 登录成功跳转
      ctx.redirect(`/login?result=${token.access_token}`);
      return;
    }
    // 登录失败跳转
    ctx.redirect('/login?result=fail');
  })

  .get('/check', async (ctx) => {
    const token = ctx.query.token;
    const result = await getCurrentUser({ accessToken: token });
    ctx.body = { status: result === undefined ? 0 : 1 };
  })

  .get('/user', async (ctx) => {
    const data = await User.findAll({
      raw: true
    });
    ctx.body = {
      status: 1,
      data
    };
  })

  .get('/team', async (ctx) => {
    const data = await Team.findAll({
      raw: true
    });
    ctx.body = {
      status: 1,
      data
    };
  })

  .get('/project', async (ctx) => {
    const data = await Project.findAll({
      raw: true
    });
    ctx.body = {
      status: 1,
      data
    };
  })

  .get('/task', async (ctx) => {
    const data = await Task.findAll({
      raw: true
    });
    ctx.body = {
      status: 1,
      data
    };
  })

  .get('/label', async (ctx) => {
    const data = await Label.findAll({
      raw: true
    });
    ctx.body = {
      status: 1,
      data
    };
  })

  .get('/tasklabels', async (ctx) => {
    const data = await TaskLabels.findAll({
      raw: true
    });
    ctx.body = {
      status: 1,
      data
    };
  });

app.use(router.routes()).use(router.allowedMethods());

module.exports = app;
