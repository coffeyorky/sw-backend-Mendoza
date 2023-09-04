const { Schema, model, default: mongoose } = require("mongoose");
const collection = "carts";

const CartSchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  ],
  quantity: Number,
});

CartSchema.pre("findOne", function () {
  this.populate("products.product");
});

const cartModel = model(collection, CartSchema);

module.exports = cartModel;
