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
  },
  price: {
    type: Number,

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
  },
  code: {
    type: String,
},
  status: {
    type: Boolean,
  },
});

//productSchema.plugin(mongoosePaginate)
const productModel = model(collection, productSchema);

module.exports =  
  productModel

