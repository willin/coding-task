const request = require('request');
const { getDefer } = require('@dwing/common');
const { auth } = require('../config');

module.exports = ({ url = '' } = {}) => {
  const deferred = getDefer();
  request.get({
    url: `https://coding.net/api/${url}`,
    method: 'GET',
    headers: {
      Authorization: auth
    }
  }, (err, httpResponse, body) => {
    if (err) {
      deferred.reject(err);
    }
    deferred.resolve(JSON.parse(body));
  });
  return deferred.promise;
};
