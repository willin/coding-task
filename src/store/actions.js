import axios from 'axios';

const actions = {
  async fetch({ commit }, type) {
    const result = await axios.get(`/api/${type}`);
    if (result.data.status === 1) {
      const data = {};
      data[type] = result.data.data;
      // 触发 mutations.fetched
      commit('fetched', data);
    }
  },
  async getAllData({ dispatch }) {
    // 按序执行接口数据读取, 为了服务器性能考虑, 不使用 await Promise.all([ ])
    await dispatch('fetch', 'user');
    await dispatch('fetch', 'team');
    await dispatch('fetch', 'project');
    await dispatch('fetch', 'label');
    await dispatch('fetch', 'task');
    await dispatch('fetch', 'tasklabels');
  }
};

export default actions;
