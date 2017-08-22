/* eslint-disable no-param-reassign */
const mutations = {
  fetched(state, data) {
    Object.keys(data).forEach((key) => {
      state[key] = data[key];
    });
  },
  progress(state, progress) {
    state.progress = progress;
  }
};

export default mutations;
