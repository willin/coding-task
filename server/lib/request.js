const request = require('request');
const { getDefer } = require('@dwing/common');
const { auth, type } = require('../config');
const redis = require('./redis');

module.exports = async ({ url = '' } = {}) => {
  const deferred = getDefer();
  const options = {
    url: `https://coding.net/api/${url}`,
    method: 'GET'
  };
  // 参数已经包含 access_token 的不做处理
  if (options.url.indexOf('access_token') === -1) {
    // 不使用 OAuth 2.0 查询的时候, 从配置文件中取 Auth
    if (type === 'token') {
      options.headers = {
        Authorization: auth
      };
    } else {
      const accessToken = await redis.get('access_token');
      options.url += (options.url.indexOf('?') !== -1 ? `&access_token=${accessToken}` : `?access_token=${accessToken}`);
    }
  }
  request.get(options, (err, httpResponse, body) => {
    if (err) {
      deferred.reject(err);
    }
    deferred.resolve(JSON.parse(body));
  });
  return deferred.promise;
};
