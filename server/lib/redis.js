const redis = require('@dwing/redis');
const { defaults: { type }, redis: redisOptions } = require('../config');

let client;
if (type === 'application') {
  client = redis(redisOptions);
} else {
  client = {};
  ['get', 'set', 'setex'].forEach((x) => {
    client[x] = () => null;
  });
}

module.exports = client;
