const { logger } = require("../config/logger.config");


// exports.processFunctin = () => {
let processFunction = () => {
//   console.log("cwd", process.cwd());
//   console.log("pid", process.pid);
//   console.log("memory", process.memoryUsage());
//   console.log("env", process.env);

//   console.log("version", process.version);
//   console.log("argv", process.argv);
logger.info("argv in las dos primeras", process.argv.slice(2));
};

processFunction();

// node process.js 1 2 3 4
// node process.js a 2 -a
// node process.js
// node process.js --mode development

process.on('exit', code => {
  logger.info('ESte cód se ejecutara justo antes de salir del processo', code)
})
process.on('uncaughtException', exception => {
  logger.info('ESte cód atrapa todas las excepciones no controladas como una func no declarada', exception)
})

logger.info(exepcion())
