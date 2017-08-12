/* eslint-disable import/no-extraneous-dependencies */
const Mock = require('mockjs');
const team = require('./team');
const avatar = require('./temp_avatar');

const teams = team.data.map(x => x.global_key);

const data = Mock.mock({
  status: 1,
  'data|3-6': [
    {
      'id|+1': 1000000,
      name: '@lower(@last)',
      'owner_user_name|1': teams,
      created_at: new Date(Mock.mock('@datetime')).getTime(),
      updated_at: new Date(Mock.mock('@datetime')).getTime(),
      backend_project_path() {
        return `/team/${this.owner_user_name}/project/${this.name}`;
      },
      project_path() {
        return `/t/${this.owner_user_name}/p/${this.name}`;
      },
      'owner_uesr_picture|1': avatar,
      owner_user_home: '<a href="https://coding.net/u/willin">willin</a>',
      description: '@csentence',
      owner_id: 0,
      status: 1,
      type: 2,
      fork_count: 0,
      star_count: 0,
      watch_count: 0,
      un_read_activities_count: 0,
      'icon|1': avatar,
      is_public: 0,
      pin: 0,
      recommended: 0,
      max_member: 20,
      group_id: 0,
      'isTeam|0-1': 0,
      plan: 1,
      'current_user_role|1': [
        'admin',
        'member'
      ],
      current_user_role_id() {
        return this.current_user_role === 'admin' ? 90 : 80;
      },
      stared: 0,
      watched: 0,
      forked: 0
    }
  ]
});

module.exports = data;

