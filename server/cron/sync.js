const { getTeams, getTeamProjects, getProjectTasks } = require('../lib/api');
const { model: { User, Team, Project, Task, Label, TaskLabels } } = require('../model');
const { defaults: { type } } = require('../config');
const redis = require('../lib/redis');

/* eslint-disable no-await-in-loop */
// eslint-disable-next-line camelcase
const updateLabels = async (task_id, labels) => {
  for (let i = 0; i < labels.length; i += 1) {
    const label = labels[i];
    await Label.upsert(label);
    await TaskLabels.upsert({ task_id, label_id: label.id });
  }
  return true;
};

const updateTasks = async (tasks) => {
  for (let i = 0; i < tasks.length; i += 1) {
    const task = tasks[i];
    await updateLabels(task.id, task.labels);
    /* eslint-disable no-param-reassign */
    delete task.labels;
    const owner = task.owner;
    await User.upsert(owner);
    delete task.owner;
    let deadline = 0;
    if (task.deadline) {
      deadline = new Date(`${new Date(task.deadline).toLocaleDateString()} 12:00:00`).getTime();
    }
    await Task.upsert(Object.assign(task, { owner_id: owner.id, deadline, task: true }));
  }
  return true;
};

const updateProjects = async (projects, team = '') => {
  for (let i = 0; i < projects.length; i += 1) {
    const project = projects[i];
    await Project.upsert(project);
    const tasks = await getProjectTasks({ team, project: project.name });
    await updateTasks(tasks.list);
  }
  return true;
};

const updateTeams = async (teams) => {
  for (let i = 0; i < teams.length; i += 1) {
    const team = teams[i];
    const owner = team.owner;
    await User.upsert(owner);
    // eslint-disable-next-line no-param-reassign
    delete team.owner;
    await Team.upsert(Object.assign(team, { owner_id: owner.id }));
    const projects = await getTeamProjects({ team: team.global_key });
    await updateProjects(projects, team.global_key);
  }
  return true;
};

module.exports = async () => {
  if (type === 'application') {
    // 检查 Access Token 是否存在, 不存在暂停任务执行
    const token = await redis.get('access_token');
    if (token === null) { return false; }
  }
  const condition = {
    where: {
      id: {
        $gt: 0
      }
    }
  };
  await Task.update({
    task: false
  }, condition);
  const teams = await getTeams();
  await updateTeams(teams);
  await Task.destroy({
    where: {
      task: false
    }
  }, condition);
  await Task.update({
    task: false
  });
  return true;
};
