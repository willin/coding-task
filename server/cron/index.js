const CronJob = require('cron').CronJob;
const sync = require('./sync');

// 每隔10分定时执行
const job = new CronJob('0 */10 * * * *', async () => {
  await sync();
}, null, true, 'Asia/Shanghai');

job.start();
