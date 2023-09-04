const { connect } = require("mongoose");
const { commander } = require("../utils/commander");
const MongoSingleton = require("../utils/MongoSingleton");
const { logger } = require("./logger.config");
require("dotenv").config()

const URL="mongodb+srv://Coffeyorky:thebadbatch123@cluster0.j69jxej.mongodb.net/ecommerce?retryWrites=true&w=majority"

//const { mode } = commander.opts();
//logger.info(mode);

// require('dotenv').config({
//   path: mode === 'development' ? './.env.development':'./.env.production'
// })
const configObje = {
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
  persistence: process.env.PERSISTENCE,
  gmail_pass: process.env.GMAIL_PASS,
  gmail_mail_user: process.env.GMAIL_MAIL_USER,
  twilio_account_sid: process.env.TWILIO_ACCOUNT_SID,
  twilio_auth_token: process.env.TWILIO_AUTH_TOKEN,
  twilio_phone_number: process.env.TWILIO_PHONE_NUMBER,
  cookie_name: process.env.COOKIE_NAME,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  my_phone_number: process.env.MY_PHONE_NUMBER,
  dbConnection: async () => MongoSingleton.getInstance(),
  // port: process.env.PORT || 8080,
  mongoURL: process.env.MONGO_URL,
  URL
  // adminName: process.env.ADMIN || "",
  // adminPassword: process.env.SECRET || "",
  // jwtSigned: process.env.SECRETO || ""
};

module.exports = {
  configObje,
};
