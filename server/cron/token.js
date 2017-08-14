const { getAccessToken } = require('../lib/api');
const redis = require('../lib/redis');

exports.refreshToken = async () => {
  const token = await getAccessToken({
    refresh_token: await redis.get('refresh_token'),
    grantType: 'refresh_token'
  });
  await redis.setex('access_token', ~~token.expires_in - 3600, token.access_token);
  await redis.setex('refresh_token', ~~token.expires_in - 3600, token.refresh_token);
};
