const { getAccessToken } = require('../lib/api');
const { setToken } = require('../lib/token');
const redis = require('../lib/redis');

exports.refreshToken = async () => {
  const refreshToken = await redis.get('refresh_token');
  if (refreshToken !== null) {
    const token = await getAccessToken({
      refresh_token: refreshToken,
      grantType: 'refresh_token'
    });
    if (token) {
      await setToken(token);
    }
  }
};
