module.exports = {
  root: true,
  extends: [
    'plugin:vue/recommended',
    'dwing'
  ],
  rules: {
    'global-require': 0,
    'import/extensions': [2, 'always', { js: 'never', vue: 'never' }]
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.config.js'
      }
    }
  }
};
