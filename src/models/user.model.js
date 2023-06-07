const { Schema, model } = require("mongoose");

const collection = "usuarios";

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  first_name: {
    type: String,
    index: true,
  },
  last_name: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  age: {
    type: Number
  },
  password: {
    type: String
  },
});

const userModel = model(collection, UserSchema);

module.exports = {
  userModel,
};
