/* eslint-disable import/no-extraneous-dependencies */
const Mock = require('mockjs');
const label = require('./label');
const project = require('./project');
const task = require('./task');
const team = require('./team');
const user = require('./user');


module.exports = (app) => {
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
  app.get('/api/label/:labelid/tasks', (req, res) => {
    res.json(Mock.mock({
      status: 1,
      'data|10-50': task.data
    }));
  });
  app.get('/api/task/:taskid/labels', (req, res) => {
    res.json(Mock.mock({
      status: 1,
      'data|0-5': label.data
    }));
  });
};
