/* eslint-disable import/no-extraneous-dependencies */
const Mock = require('mockjs');
const avatar = require('./temp_avatar');

const data = Mock.mock({
  status: 1,
  'data|15-25': [
    {
      'id|+1': 10000,
      global_key: '@lower(@last)',
      name_pinyin: '@cname',
      'sex|0-1': 0,
      location: '@city(true)',
      company: '@ctitle',
      slogan: '@csentence',
      website: '@url',
      introduction: '@csentence',
      'avatar|1': avatar,
      'gavatar|1': avatar,
      'lavatar|1': avatar,
      created_at: new Date(Mock.mock('@datetime')).getTime(),
      updated_at: new Date(Mock.mock('@datetime')).getTime(),
      last_logined_at: new Date(Mock.mock('@datetime')).getTime(),
      name() {
        return this.global_key;
      },
      path() {
        return `/u/${this.global_key}`;
      },
      status: 1,
      is_member: 0,
      'vip|1-4': 1,
      'dgree|0-4': 1,
      school: '@ctitle',
      follows_count: 0,
      fans_count: 0,
      tweets_count: 0,
      followed: 0,
      follow: 0
    }
  ]
});

module.exports = data;
