const { connect } = require("mongoose");
const { commander } = require("../utils/commander");
const MongoSingleton = require("../utils/MongoSingleton");
const { logger } = require("../utils/logger");
require("dotenv").config()

//const { mode } = commander.opts();
//logger.info(mode);

// require('dotenv').config({
//   path: mode === 'development' ? './.env.development':'./.env.production'
// })

// let url =
//   "mongodb+srv://Coffeyorky:thebadbatch123@cluster0.j69jxej.mongodb.net/ecommerce?retryWrites=true&w=majority";

const configObje = {
  persistence: process.env.PERSISTENCE,
  gmail_pass: process.env.GMAIL_PASS,
  gmail_mail_user: process.env.GMAIL_MAIL_USER,
  twilio_account_sid: process.env.TWILIO_ACCOUNT_SID,
  twilio_auth_token: process.env.TWILIO_AUTH_TOKEN,
  twilio_phone_number: process.env.TWILIO_PHONE_NUMBER,
  my_phone_number: process.env.MY_PHONE_NUMBER,
  dbConnection: async () => MongoSingleton.getInstance(),
  // port: process.env.PORT || 8080,
  mongoURL: process.env.MONGO_URL,
  // adminName: process.env.ADMIN || "",
  // adminPassword: process.env.SECRET || "",
  // jwtSigned: process.env.SECRETO || "",
  //url: "mongodb+srv://Coffeyorky:thebadbatch123@cluster0.j69jxej.mongodb.net/ecommerce?retryWrites=true&w=majority",
};

module.exports = {
  configObje,
};
