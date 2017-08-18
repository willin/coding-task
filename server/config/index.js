const ENV = process.env.NODE_ENV || 'development';
// eslint-disable-next-line import/no-dynamic-require
const options = require(`./_${ENV}`);

module.exports = options;
