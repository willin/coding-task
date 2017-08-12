/* eslint-disable no-param-reassign */
const mutations = {
  fetched(state, data) {
    Object.keys(data).forEach((key) => {
      state[key] = data[key];
    });
  }
};

export default mutations;
