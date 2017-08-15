/* eslint-disable import/no-extraneous-dependencies */
const Mock = require('mockjs');
const label = require('./label');
const project = require('./project');
const task = require('./task');
const team = require('./team');
const user = require('./user');
const { getAccessToken, getCurrentUser } = require('../server/lib/api');


module.exports = (app) => {
  // 模拟Coding登录
  app.get('/api/coding/callback', async (req, res) => {
    const code = req.query.code;
    const token = await getAccessToken({ code });
    if (token === undefined) {
      res.redirect('/login?result=500');
      return;
    }
    res.redirect(`/login?result=${token.access_token}`);
  });
  app.get('/api/check', async (req, res) => {
    const token = req.query.token;
    const result = await getCurrentUser({ accessToken: token });
    res.json({ status: result === undefined ? 0 : 1 });
  });
  // 模拟数据
  app.get('/api/label', (req, res) => {
    res.json(label);
  });
  app.get('/api/project', (req, res) => {
    res.json(project);
  });
  app.get('/api/task', (req, res) => {
    res.json(task);
  });
  app.get('/api/team', (req, res) => {
    res.json(team);
  });
  app.get('/api/user', (req, res) => {
    res.json(user);
  });
  app.get('/api/tasklabels', (req, res) => {
    res.json(Mock.mock({
      status: 1,
      'data|2000-3000': [
        {
          'task_id|1': task.data.map(x => x.id),
          'label_id|1': label.data.map(x => x.id)
        }
      ]
    }));
  });
};
