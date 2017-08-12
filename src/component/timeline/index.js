module.exports = (resolve) => {
  require.ensure(['./timeline.vue'], () => {
    resolve(require('./timeline.vue'));
  }, 'timeline');
};
