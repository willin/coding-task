/* eslint-disable no-proto */
/**
 * 数组分页
 * @param {int} page 第几页
 * @param {int} per 每页多少条数据
 * @return {array} 分页数据
 * 示例:
 * tasks.page({ page: 1, per: 50 });
 * 禁止:
 * tasks.page().where({ project_id: 123456 });
 */
function handlePager({ page = 1, per = 20 } = {}) {
  return this.slice((page - 1) * per, page * per);
}

/**
 * 筛选
 * @param {*} where 条件
 * @return {array} 筛选数据
 * 示例:
 * tasks.where({ project_id: 123456, owner_id: 123456 });
 * 允许:
 * tasks.where({ project_id: 123456 }).page();
 */
function handleWhere(where) {
  const result = this.filter((task) => {
    const keys = Object.keys(where);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (where[key] !== task[key]) {
        return false;
      }
    }
    return true;
  });
  result.__proto__.page = handlePager;
  return result;
}

const getters = {
  tasks: (state) => {
    const tasks = state.task;
    // 绑定`查询`和`分页`事件
    tasks.__proto__.where = handleWhere;
    tasks.__proto__.page = handlePager;
    return tasks;
  },
  tasksDone: (state, getter) => {
    // 以完成任务按照时间降序排列, 越新的越靠前
    const tasks = getter.tasks.where({ status: 2 }).sort((prev, next) => (prev.deadline < next.deadline ? 1 : -1));
    tasks.__proto__.where = handleWhere;
    tasks.__proto__.page = handlePager;
    return tasks;
  },
  tasksUndone: (state, getter) => {
    // 未完成任务按照时间升序排列, 越旧的越靠前
    // 第一次排序: [过去,未来] (不包含[0])
    const scheduled = getter.tasks.filter(t => t.deadline !== 0 && t.status === 1).sort((x, y) => x.deadline - y.deadline);
    // 关键段: [0*]
    const unscheduled = getter.tasks.filter(t => t.deadline === 0 && t.status === 1).sort((x, y) => x.created_at - y.created_at);
    const tasks = [...scheduled, ...unscheduled];
    tasks.__proto__.where = handleWhere;
    tasks.__proto__.page = handlePager;
    return tasks;
  },
  users: state => state.user,
  projects: state => state.project,
  labels: state => state.label,
  tasklabels: state => state.tasklabels
};

export default getters;
