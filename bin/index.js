const app = require('../server');
const config = require('../_config');
const server = require('http').Server(app);

const port = normalizePort(config.port | process.env.PORT) ;

server.listen(port);
console.log(`server is running on: http://localhost:${port}${config.root}`);

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) { return val; }
  if (port > 0) { return port; }
  return false;
}