const { connect } = require("mongoose");
const { commander } = require("../utils/commander");
const  MongoSingleton  = require("../utils/MongoSingleton");

const {mode} = commander.opts()
console.log(mode)

// require('dotenv').config({
//   path: mode === 'development' ? './.env.development':'./.env.production'
// })

let url =
  "mongodb+srv://Coffeyorky:thebadbatch123@cluster0.j69jxej.mongodb.net/ecommerce?retryWrites=true&w=majority";

const configObje = {
    persistence: process.env.PERSISTENCE,
  dbConnection: async () => MongoSingleton.getInstance(),
  // port: process.env.PORT || 8080,
  // mongoURL: process.env.MONGO_URL,
  // adminName: process.env.ADMIN || "",
  // adminPassword: process.env.SECRET || "",
  // jwtSigned: process.env.SECRETO || "",
  url: "mongodb+srv://Coffeyorky:thebadbatch123@cluster0.j69jxej.mongodb.net/ecommerce?retryWrites=true&w=majority",
}

module.exports = {
  configObje
};
