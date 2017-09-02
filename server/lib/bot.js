const { notification } = require('../config');
const { getDefer } = require('@dwing/common');
const request = require('request');

const dingbot = async ({ url = '', msg = '' } = {}) => {
  const opts = {
    msgtype: 'markdown',
    markdown: {
      title: '任务提示',
      text: `## 任务提示\n${msg}`
    },
    at: {
      isAtAll: true
    }
  };
  const deferred = getDefer();
  request.post(url, {
    json: opts
  }, (err, httpResponse, body) => {
    if (err) {
      deferred.reject(err);
    }
    deferred.resolve(body);
  });
  return deferred.promise;
};

module.exports = async (msg) => {
  if (notification.type === 'dingbot') {
    const result = await dingbot({ url: notification.url, msg });
    return result;
  }
};
