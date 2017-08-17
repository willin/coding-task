/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./webpack.config');
const setup = require('../mock');

const devServer = {
  historyApiFallback: true,
  noInfo: true,
  port: 3993
};

if (process.env.API_ENV === 'real') {
  const proxy = {
    '/api': {
      target: 'http://localhost:3933',
      pathRewrite: { '^/api': '' }
    }
  };
  devServer.proxy = proxy;
} else {
  devServer.setup = setup;
}

module.exports = Object.assign({}, config, {
  devServer,
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new ExtractTextPlugin('[name].css', {
      disable: false,
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html')
    })
  ]
});
