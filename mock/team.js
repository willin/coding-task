/* eslint-disable import/no-extraneous-dependencies */
const Mock = require('mockjs');
const user = require('./user');
const avatar = require('./temp_avatar');

const uids = user.data.map(x => x.id);

const data = Mock.mock({
  status: 1,
  'data|3-6': [
    {
      'id|+1': 1000,
      global_key: '@lower(@last)',
      'owner_id|1': uids,
      created_at: new Date(Mock.mock('@datetime')).getTime(),
      updated_at: new Date(Mock.mock('@datetime')).getTime(),
      name() {
        return this.global_key;
      },
      name_pinyin: '@cname',
      introduction: '@csentence',
      'avatar|1': avatar,
      path() {
        return `/p/${this.global_key}`;
      },
      'member_count|1-20': 1,
      'project_count|1-20': 1,
      locked: 0
    }
  ]
});

module.exports = data;
