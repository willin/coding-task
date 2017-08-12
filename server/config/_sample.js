const auth = {
  username: '', // Coding 的用户名
  token: '' // Coding 获取的 Token
};

// 需要统计分析的团队列表
exports.team = [
  'airdwing'
];

// 服务器配置
exports.server = {
  port: 3933,
  hostname: '127.0.0.1'
};

// 数据库配置
exports.mysql = {
  database: 'coding',
  host: '127.0.0.1',
  user: 'root',
  password: 'root'
};

exports.auth = `Basic ${new Buffer(`${auth.username}:${auth.token}`).toString('base64')}`;
