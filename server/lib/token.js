const redis = require('./redis');

exports.setToken = async ({ expires_in: expires = '', access_token: accessToken = '', refresh_token: refreshToken = '' } = {}) => {
  await redis.setex('access_token', ~~expires - 3600, accessToken);
  await redis.setex('refresh_token', ~~expires - 3600, refreshToken);
  return true;
};
