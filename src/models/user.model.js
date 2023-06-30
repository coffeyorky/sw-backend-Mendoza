const { Schema, model } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2')

const collection = "usuarios";

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
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
  password: String

});

UserSchema.plugin(mongoosePaginate)
const userModel = model(collection, UserSchema)

module.exports = {
  userModel
};
