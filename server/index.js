const app = require('./server');
const { server } = require('./config');

app.listen(server);
console.log(new Date());
