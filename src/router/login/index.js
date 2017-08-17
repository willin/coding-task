module.exports = (resolve) => {
  require.ensure(['./login.vue'], () => {
    resolve(require('./login.vue'));
  }, 'login');
};
