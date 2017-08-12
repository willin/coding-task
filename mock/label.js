/* eslint-disable import/no-extraneous-dependencies */
const Mock = require('mockjs');
const project = require('./project');
const user = require('./user');

const pids = project.data.map(x => x.id);
const uids = user.data.map(x => x.id);

const list = [];

pids.forEach((pid) => {
  const item = Mock.mock({
    'data|3-5': [
      {
        'id|+1': 2000000,
        project_id: pid,
        'name|+1': [
          'Bug',
          '功能',
          '调研',
          '性能优化',
          '规划中'
        ],
        color: '@color',
        'owner_id|1': uids,
        count: 0,
        processing: 0,
        task_count: 0,
        merge_request_count: 0
      }
    ]
  });
  list.push(...item.data);
});

const data = Mock.mock({
  status: 1,
  data: list
});

module.exports = data;
