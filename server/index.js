const app = require('./server');
const { server } = require('./config');

app.listen(process.env.PORT || server);
console.log(new Date());
