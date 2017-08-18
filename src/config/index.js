const ENV = process.env.NODE_ENV || 'development';

// eslint-disable-next-line import/no-dynamic-require
export default require(`./${ENV}`);
