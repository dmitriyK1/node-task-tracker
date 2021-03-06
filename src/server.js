import 'dotenv/config';
import http from 'http';

import { app } from './app';
import models from './models';
import { registerErrorHandlers } from './utils/error';

registerErrorHandlers();

const port = process.env.PORT || 8080;
app.set('port', port);
const server = http.createServer(app);

initApp();

function initApp() {
  models.sequelize.sync().then(() => {
    server.listen(port, () => {
      console.log(`Example app listening on ${port}!`);
    });

    server.on('error', onError);
    server.on('listening', onListening);
  });
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
}
