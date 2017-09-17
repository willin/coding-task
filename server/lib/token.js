const redis = require('./redis');

exports.setToken = async ({ access_token: accessToken = '', refresh_token: refreshToken = '' } = {}) => {
  await redis.setex('access_token', 828000, accessToken);
  await redis.setex('refresh_token', 82800, refreshToken);
  return true;
};
