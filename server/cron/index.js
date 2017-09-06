const { defaults: { type }, notification: { type: notification } } = require('../config');
const CronJob = require('cron').CronJob;
const sync = require('./sync');
const { refreshToken } = require('./token');
const { dailyNotice, dailyUndoneNotice, notice } = require('./notify');

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
  // 每周一至周五 早上8:30 通知
  new CronJob('0 30 8 * * 1-5', async () => {
    await dailyNotice();
  }, null, true, 'Asia/Shanghai');
  // 每周一至周五 下午5:00 通知
  new CronJob('0 0 17 * * 1-5', async () => {
    await dailyUndoneNotice();
  }, null, true, 'Asia/Shanghai');
  // 每周六 晚上8点 通知
  new CronJob('0 0 20 * * 6', async () => {
    await notice('week');
  }, null, true, 'Asia/Shanghai');
  // 每月1号 早上9点通知
  new CronJob('0 0 9 1 * *', async () => {
    await notice('month');
  }, null, true, 'Asia/Shanghai');
}
