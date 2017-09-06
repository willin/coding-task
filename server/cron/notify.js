
const { model: { User, Task } } = require('../model');
const bot = require('../lib/bot');
const moment = require('moment');

const filterUsers = async (tasks) => {
  let users = await User.findAll({
    raw: true
  });
  users = users.filter(x => tasks.findIndex(y => x.id === y.owner_id) !== -1);
  return users;
};

exports.dailyUndoneNotice = async () => {
  const tasks = await Task.findAll({
    raw: true,
    where: {
      deadline: {
        $lt: moment().endOf('day').valueOf(),
        $gt: 0
      },
      status: 1
    }
  });
  const users = await filterUsers(tasks);
  let msg = '过期任务提示:\n\n';
  const userTasks = users.map(x => ({
    username: x.name,
    tasks:
      tasks.filter(y => y.owner_id === x.id).sort((t1, t2) => t2.deadline - t1.deadline)
        .map(t => `- ${t.content} ${t.deadline !== 0 ? `(${moment(t.deadline).format('YYYY-MM-DD')})` : ''}\n`).join('')
  }));
  msg += userTasks.map(x => `### ${x.username}\n\n${x.tasks}`).join('\n');
  const result = await bot(msg);
  return result;
};

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
  const users = await filterUsers(tasks);
  let msg = '';
  if (users.length === 0) {
    msg = '今日竟然没有安排任务, 还想要年终奖么?';
  } else {
    const userTasks = users.map(x => ({
      username: x.name,
      tasks: tasks.filter(y => y.owner_id === x.id).map(z => z.content)
    }));
    if (users.length < 5) {
      msg = '怎么今天只有这么几个小伙伴有任务? 偷懒是要打pp的.\n\n';
    }
    msg += userTasks.map(x => `### ${x.username}\n\n${x.tasks.map(t => `- ${t}\n`).join('')}`).join('\n');
  }
  const result = await bot(msg);
  return result;
};

const buildMessage = (x) => {
  let msg = '';
  if (x.length > 0) {
    msg += `, 其中重要任务 ${x.length}个:\n`;
    x.forEach((m) => {
      msg += `- ${m.content} ${m.status === 2 ? '' : '(未完成)'}\n`;
    });
  }
  return msg;
};

const nextPeriod = async (type = 'week') => {
  const tasks = await Task.findAll({
    raw: true,
    where: {
      deadline: {
        $gt: moment().startOf(type).add(1, type === 'month' ? 'M' : 'w').valueOf(),
        $lt: moment().endOf(type).add(1, type === 'month' ? 'M' : 'w').valueOf()
      }
    }
  });
  const users = await filterUsers(tasks);
  const userTasks = users.map(x => ({
    username: x.name,
    tasks: tasks.filter(y => y.owner_id === x.id).length,
    important: tasks.filter(y => y.owner_id === x.id && y.priority >= 2)
  })).sort((x, y) => y.doneTasks - x.doneTasks);
  const msg = userTasks.map((x) => {
    let message = `### ${x.username}\n\n`;
    message += `\n\n任务: ${x.tasks}个`;
    message += buildMessage(x);
    return `${message}\n`;
  }).join('\n');
  return msg;
};

exports.notice = async (type = 'week') => {
  const tasks = await Task.findAll({
    raw: true,
    where: {
      deadline: {
        $gt: moment().startOf(type).valueOf(),
        $lt: moment().endOf(type).valueOf()
      }
    }
  });
  const users = await filterUsers(tasks);
  const userTasks = users.map(x => ({
    username: x.name,
    doneTasks: tasks.filter(y => y.owner_id === x.id && y.status === 2).length,
    undoneTasks: tasks.filter(y => y.owner_id === x.id && y.status === 1).length,
    important: tasks.filter(y => y.owner_id === x.id && y.priority >= 2)
  })).sort((x, y) => y.doneTasks - x.doneTasks);
  let msg = userTasks.map((x) => {
    let message = `### ${x.username}\n\n`;
    message += `完成任务: ${x.doneTasks}个, 未完成任务: ${x.undoneTasks}个`;
    message += buildMessage(x.important);
    return `${message}\n`;
  }).join('\n');
  msg = `## 本${type === 'month' ? '月' : '周'}任务完成情况 \n\n${msg}`;
  msg += `## 下${type === 'month' ? '月' : '周'}任务计划 \n\n${await nextPeriod(type)}`;
  const result = await bot(msg);
  return result;
};
