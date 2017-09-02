
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
      },
      status: 1
    }
  });
  let users = await User.findAll({
    raw: true
  });
  let msg;
  users = users.filter(x => tasks.findIndex(y => x.id === y.owner_id) !== -1);
  if (users.length === 0) {
    msg = '今日没有待办任务, 大家别偷懒哦';
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

exports.weeklyNotice = async () => {
  const tasks = await Task.findAll({
    raw: true,
    where: {
      deadline: {
        $gt: moment().startOf('week').valueOf(),
        $lt: moment().endOf('week').valueOf()
      }
    }
  });
  let users = await User.findAll({
    raw: true
  });
  users = users.filter(x => tasks.findIndex(y => x.id === y.owner_id) !== -1);
  const userTasks = users.map(x => ({
    username: x.name,
    doneTasks: tasks.filter(y => y.owner_id === x.id && y.status === 2).length,
    undoneTasks: tasks.filter(y => y.owner_id === x.id && y.status === 1).length,
    important: tasks.filter(y => y.owner_id === x.id && y.priority >= 2)
  })).sort((x, y) => y.doneTasks - x.doneTasks);
  const msg = userTasks.map((x) => {
    let message = `### ${x.username}\n\n`;
    message += `本周完成任务: ${x.doneTasks}个, 未完成任务: ${x.undoneTasks}个.\n`;
    if (x.important.length > 0) {
      message += `\n重要任务 ${x.important.length}个: \n`;
      x.important.forEach((m) => {
        message += `- ${m.content} ${m.status === 2 ? '' : '(未完成)'}\n`;
      });
    }
    return message;
  }).join('\n');

  const result = await bot(msg);
  return result;
};
