
const { model: { User, Task } } = require('../model');
const bot = require('../lib/bot');
const moment = require('moment');

exports.dailyNotice = async () => {
  const tasks = await Task.findAll({
    raw: true,
    where: {
      deadline: {
        $gt: moment().startOf('day').valueOf(),
        $lt: moment().endOf('day').valueOf()
      }
    }
  });
  const users = await User.findAll({
    raw: true
  }).filter(x => tasks.findIndex(y => x.id === y.owner_id));
  let msg;
  if (users.length === 0) {
    msg = '今日没有待办任务哦';
  } else {
    const userTasks = users.map(x => ({
      username: x.name,
      tasks: tasks.filter(y => y.owner_id === x.id).map(z => z.content)
    }));
    msg = userTasks.map(x => `### ${x.username}\n\n${x.tasks.map(t => `- ${t}\n`).join('')}`).join('\n');
  }
  const result = await bot(msg);
  return result;
};
