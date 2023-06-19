const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2")

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
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String
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

productSchema.plugin(mongoosePaginate)
const productModel = model(collection, productSchema);

module.exports =  {
  productModel
}
