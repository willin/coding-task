const CronJob = require('cron').CronJob;
const sync = require('./sync');
const { refreshToken } = require('./token');
const { defaults: { type } } = require('../config');

/* eslint-disable no-new */
// 更新任务数据, 每隔10分定时执行
new CronJob('0 */10 * * * *', async () => {
  await sync();
}, null, true, 'Asia/Shanghai');

// 更新AccessToken 每隔2小时定时执行
if (type === 'application') {
  new CronJob('0 */10 * * * *', async () => {
    await refreshToken();
  }, null, true, 'Asia/Shanghai');
}
