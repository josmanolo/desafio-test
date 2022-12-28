import { Router } from 'express';
import compression from "compression";
import { cpus } from 'os';
const router = Router();

router.get('/', compression(), (req, res) => {
  const args = process.argv.slice(2).join('; ');
  const info = {
    args, //Argumentos de entrada
    path: process.execPath, //Path de ejecución
    os: process.platform, //Nombre de la plataforma (sistema operativo)
    pid: process.pid, //Process id
    nodeVersion: process.version, //Versión de node.js
    dirPath: process.cwd(), //Carpeta del proyecto
    memoryUsage: process.memoryUsage.rss() / 2 ** 20, //Memoria total reservada (rss) en MiB
    numCPUs: cpus().length,
  };
  /* ------------------------ Evaluación de rendimiento ----------------------- */
  // console.log(info.args);
  // console.log(info.path);
  // console.log(info.os);
  // console.log(info.pid);
  // console.log(info.nodeVersion);
  // console.log(info.dirPath);
  // console.log(info.memoryUsage);
  // console.log(info.numCPUs);
  /* ----------------------------------- -- ----------------------------------- */
  res.status(200).render('partials/viewInfo', {
    info,
  });
});

export default router;