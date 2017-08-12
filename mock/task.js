/* eslint-disable import/no-extraneous-dependencies */
const Mock = require('mockjs');
const project = require('./project');
const user = require('./user');

const pids = project.data.map(x => x.id);
const uids = user.data.map(x => x.id);

const data = Mock.mock({
  status: 1,
  'data|1000': [
    {
      'id|+1': 3000000,
      'number|1-300': 1,
      'creator_id|1': uids,
      deadline() {
        if (this.id % 2 === 0) {
          return 0;
        }
        const time = Math.ceil(Math.random() * 86400 * 365);
        if (time % 2 === 0) {
          return new Date().getTime() + time * 1000;
        }
        return new Date().getTime() - time * 1000;
      },
      content: '@csentence',
      'owner_id|1': uids,
      'project_id|1': pids,
      created_at: new Date(Mock.mock('@datetime')).getTime(),
      updated_at: new Date(Mock.mock('@datetime')).getTime(),
      'status|1-2': 1,
      'priority|0-3': 1,
      'comments|0-10': 0,
      'has_description|0-1': 1,
      'current_user_role_id|80-100': 0,
      'watch|0-1': 0
    }
  ]
});

module.exports = data;
