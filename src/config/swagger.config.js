const { dirname } = require("path")
console.log(dirname(__dirname))
exports.swaggerOptions = {
    definition: {
      openapi: "3.0.1",
      info: {
        title: "Documentacion de app",
        description: "Api pensada para adopcion",
      },
    },
    apis: [`${dirname(__dirname)}/docs/**/*.yaml`],
  };