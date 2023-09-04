const { mongoose, Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const collection = "usuarios";

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  first_name: {
    type: String,
    index: true,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: ["user", "admin", "premium"],
    default: "user",
  },
});

//UserSchema.plugin(mongoosePaginate)
const userModel = model(collection, UserSchema);

module.exports = userModel;
