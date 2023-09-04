const { Schema, model, default: mongoose } = require("mongoose");
const collection = "Messages";

const MessageSchema = new Schema({
  user: String,
  message: string
});

const messageModel = model(collection, MessageSchema);

module.exports = messageModel;