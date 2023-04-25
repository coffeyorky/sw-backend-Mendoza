const { Schema, model } = require("mongoose");

const collection = "productos";
const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  stock: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
  },
});

const productsModel = model(collection, productSchema);

module.exports = {
  productsModel
};
