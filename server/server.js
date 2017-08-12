const Koa = require('koa');
const Router = require('koa-router');
const { model: { User, Team, Project, Task, Label, TaskLabels } } = require('../server/model');

const app = new Koa();
const router = new Router();

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

router.get('/task/:taskid/labels', async (ctx) => {
  const taskid = ctx.params.taskid;
  const data = await TaskLabels.findAll({
    where: {
      task_id: taskid
    },
    raw: true
  });
  ctx.body = {
    status: 1,
    data: data.map(x => x.label_id)
  };
});

router.get('/label/:labelid/tasks', async (ctx) => {
  const labelid = ctx.params.labelid;
  const data = await TaskLabels.findAll({
    where: {
      label_id: labelid
    },
    raw: true
  });
  ctx.body = {
    status: 1,
    data: data.map(x => x.task_id)
  };
});


app.use(router.routes()).use(router.allowedMethods());

module.exports = app;
