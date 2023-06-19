// exports.processFunctin = () => {
let processFunction = () => {
//   console.log("cwd", process.cwd());
//   console.log("pid", process.pid);
//   console.log("memory", process.memoryUsage());
//   console.log("env", process.env);

//   console.log("version", process.version);
//   console.log("argv", process.argv);
  console.log("argv in las dos primeras", process.argv.slice(2));
};

processFunction();

// node process.js 1 2 3 4
// node process.js a 2 -a
// node process.js
// node process.js --mode development

process.on('exit', code => {
    console.log('ESte cód se ejecutara justo antes de salir del processo', code)
})
process.on('uncaughtException', exception => {
    console.log('ESte cód atrapa todas las excepciones no controladas como una func no declarada', exception)
})

console.log(exepcion())
