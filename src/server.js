//  const { initServer } = require("./app");
//  const cluster = require("cluster");
//  const {cpus} = require("os");
//  const { logger } = require("./utils/logger");

//  logger.info(process.pid);
// logger.info(cluster.isPrimary);
//  const numeroProcesadores = cpus().length
//  logger.info(numeroProcesadores)

//  if (cluster.isPrimary) {
//   logger.info("proceso primario, genrando un proceso trabajador");
//    for(let i = 0; i < numeroProcesadores; i++){
//      cluster.fork();
//   }
//   cluster.on("message", worker =>{
//      logger.info(`El worker ${worker.process.id} dice ${worker.message}`)
//    })
//  } else {
//      logger.info("proceso forkeado");
//      logger.info(`worker con el id: ${process.pid}`)
//      initServer()
//  }

