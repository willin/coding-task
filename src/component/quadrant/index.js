module.exports = (resolve) => {
  require.ensure(['./quadrant.vue'], () => {
    resolve(require('./quadrant.vue'));
  }, 'quadrant');
};
