const request = require('./request');
const querystring = require('querystring');
const { teams, clientId, clientSecret } = require('../config');

/**
 * 获取加入的团队,筛选包含 dwing 字段的
 * @param {string} accessToken 该接口中为必须参数(如果是令牌访问的话需要 user 权限(高风险))
 * @return {object} 返回数据格式: (未显示无关参数)
    {
      global_key: 'willin',
      email: 'admin@qq.com'
      phone: '13212341234'
    }
 */
exports.getCurrentUser = async ({ accessToken = '' } = {}) => {
  const result = await request({
    url: `current_user${accessToken === '' ? '' : `?access_token=${accessToken}`}`
  });
  return result.data;
};
/**
 * 获取加入的团队,筛选包含 dwing 字段的
 * @param {string} accessToken 可选参数
 * @return {array} 
 */
exports.getTeams = async ({ accessToken = '' } = {}) => {
  const result = await request({
    url: `team/joined${accessToken === '' ? '' : `?access_token=${accessToken}`}`
  });
  if (Array.isArray(result.data)) {
    return result.data.filter(x => teams.includes(x.global_key));
  }
  return [];
};

/**
 * 获取团队的项目
 * @param {string} team 团队名称, 如 dwing (来自于URL中: https://coding.net/t/dwing)
 * @return {array} List
 */
exports.getTeamProjects = async ({ team = '' } = {}) => {
  const result = await request({
    url: `team/${team}/projects/joined`
  });
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

/**
 * 获取 Coding access_token
 * @param {string} code 服务器端返回的 code
 * @param {string} grantType authorization_code 或 refresh_token
 * @return {object} 返回数据格式:
  {
    access_token: "xxxxxxx",
    refresh_token: "xxxxxx",
    expires_in: "86382817"
  }
 */
exports.getAccessToken = async ({ code = '', grantType = 'authorization_code' } = {}) => {
  const result = await request({
    url: `oauth/access_token?${querystring.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: grantType,
      code
    })}`
  });
  return result;
};
