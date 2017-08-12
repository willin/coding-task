// PM2 App Config
const path = require('path');

module.exports = {
  apps: [
    {
      name: 'coding-graph',
      script: 'index.js',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      cwd: path.join(__dirname, './server'),
      error_file: path.join(__dirname, '../log/coding-graph.err.log'),
      out_file: path.join(__dirname, '../log/coding-graph.out.log'),
      // instances: 0,
      // exec_mode: 'cluster',
      max_memory_restart: '800M',
      merge_logs: true
    },
    {
      name: 'coding-task',
      script: 'index.js',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      cwd: path.join(__dirname, './server/cron'),
      error_file: path.join(__dirname, '../log/coding-task.err.log'),
      out_file: path.join(__dirname, '../log/coding-task.out.log'),
      max_memory_restart: '800M',
      merge_logs: true
    }
  ]
};
