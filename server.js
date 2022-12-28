import cluster from 'cluster';
import { cpus } from 'os';
import { Server as httpServer } from 'http';
import { Server as ioServer } from 'socket.io';
import { CLUSTER_MODE, APP_PORT } from './src/config/index.js';
import { loggerInfo, loggerError } from './src/config/log4.js';
import app from './app.js';
import webSocket from './src/controllers/sockets/index.js';

/* ----------------------------- server settings ---------------------------- */
const logServerMode = CLUSTER_MODE
  ? 'Servidor en modo CLUSTER'
  : 'Servidor en modo FORK';
loggerInfo.info(logServerMode);

let server = null;
if (CLUSTER_MODE && cluster.isPrimary) {
  const numCPUs = cpus().length;

  loggerInfo.info(`PID MASTER ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    const fecha = new Date().toLocaleString();
    loggerInfo.info(
      `Worker ${worker.process.pid} fue terminado a las: ${fecha}`
    );
    cluster.fork();
  });
} else {
  const serverHTTP = new httpServer(app);
  /* --------------------------- WebSocket settings --------------------------- */
  const io = new ioServer(serverHTTP);
  webSocket(io);

  server = serverHTTP.listen(APP_PORT, () => {
    loggerInfo.info(
      `Servidor HTTP escuchando en el puerto ${server.address().port}`
    );
    loggerInfo.info(`PID WORKER ${process.pid}`);
  });

  server.on('error', (error) => {
    loggerError.error(`Error en el servidor: ${error.message}`);
  });
}

export default server;
