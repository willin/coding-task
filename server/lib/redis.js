const redis = require('@dwing/redis');
const { storage } = require('../config');

let client;
const data = {};
if (storage.type === 'redis') {
  client = redis(storage.redis);
} else {
  client = {
    get(key) {
      if (data[key] && new Date().getTime() - data[key].expires > 0) {
        return data[key].val;
      }
      return null;
    },
    setex(key, expires, val) {
      data[key] = {
        val,
        expires: new Date().getTime() + expires * 1000
      };
      return true;
    },
    set(key, val) {
      return this.setex(key, 0, val);
    }
  };
}

module.exports = client;
