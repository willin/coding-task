module.exports = (resolve) => {
  require.ensure(['./statistics.vue'], () => {
    resolve(require('./statistics.vue'));
  }, 'statistics');
};
