/* eslint-disable import/no-extraneous-dependencies */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('./webpack.config');

module.exports = Object.assign({}, config, {
  plugins: config.plugins.concat(new BundleAnalyzerPlugin())
});
