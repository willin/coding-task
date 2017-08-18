module.exports = (resolve) => {
  require.ensure(['./statistics.vue'], () => {
    resolve(require('./statistics.vue'));
  }, 'statistics');
};

// module.exports = require('./statistics.vue');
