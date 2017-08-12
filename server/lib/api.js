const request = require('./request');
const querystring = require('querystring');
const { teams } = require('../config');

/**
 * 获取加入的团队,筛选包含 dwing 字段的
 * @return {Array} List
 */
exports.getTeams = async () => {
  const result = await request({
    url: 'team/joined'
  });
  return result.data.filter(x => teams.includes(x.global_key));
};

/**
 * 获取团队的项目
 * @param {string} team 团队名称, 如 dwing (来自于URL中: https://coding.net/t/dwing)
 * @return {Array} List
 */
exports.getTeamProjects = async ({ team = '' } = {}) => {
  // 获取我参与的项目
  const result = await request({
    url: `team/${team}/projects/joined`
  });
  // 另外还有:
  // - 未参与的项目: `team/${team}/projects/joined`
  // - 归档的项目: `team/${team}/projects/archived`
  return result.data;
};

/**
 * 获取项目任务列表
 * @param {string} team 团队名称, 如 dwing (来自于URL中: https://coding.net/t/dwing)
 * @param {string} project 项目名称, 如 AirHub (来自于URL中: https://coding.net/t/dwing/p/AirHub)
 * @return {object} 返回数据格式:
  {
    "list": [],
    "page": 1,
    "pageSize": 1000,
    "totalPage": 1,
    "totalRow": 35
  }
 */
exports.getProjectTasks = async ({ team = '', project = '', page = 1 }) => {
  const result = await request({
    url: `user/${team}/project/${project}/tasks/all?${querystring.stringify({
      orderRule: 0,
      page,
      pageSize: 10000
    })}`
  });
  return result.data;
};
