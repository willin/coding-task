const { defaults: { type }, notification: { type: notification } } = require('../config');
const CronJob = require('cron').CronJob;
const sync = require('./sync');
const { refreshToken } = require('./token');
const { dailyNotice } = require('./notify');

/* eslint-disable no-new */
// 更新任务数据, 每隔10分定时执行
new CronJob('0 */10 * * * *', async () => {
  await sync();
}, null, true, 'Asia/Shanghai');

// 更新AccessToken 每隔2小时定时执行
if (type === 'application') {
  new CronJob('0 10 */2 * * *', async () => {
    await refreshToken();
  }, null, true, 'Asia/Shanghai');
}

if (notification) {
  new CronJob('0 30 8 * * 1-5', async () => {
    await dailyNotice();
  }, null, true, 'Asia/Shanghai');
}
