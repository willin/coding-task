const { getAccessToken } = require('../lib/api');
const redis = require('../lib/redis');

exports.refreshToken = async () => {
  const refreshToken = await redis.get('refresh_token');
  if (refreshToken !== null) {
    const token = await getAccessToken({
      refresh_token: refreshToken,
      grantType: 'refresh_token'
    });
    if (token) {
      await redis.setex('access_token', ~~token.expires_in - 3600, token.access_token);
      await redis.setex('refresh_token', ~~token.expires_in - 3600, token.refresh_token);
    }
  }
};
