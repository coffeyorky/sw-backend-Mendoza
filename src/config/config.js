const { connect } = require("mongoose");
const { productsModel } = require("../models/products.model");
const { cartModel } = require("../models/carts.model");

let url =
  "mongodb+srv://Coffeyorky:thebadbatch123@cluster0.j69jxej.mongodb.net/ecommerce?retryWrites=true&w=majority";

const objConfig = {
  connectDB: async () => {
    try {
      await connect(url)
      console.log("base de datos conectada")
    } catch (error) {
      console.log(error)
    }
    // await productsModel.create({
    //   title: "Remera Bad batch",
    //   description:
    //     "Remera de talla universal con estampado de los personajes de la serie The Bad Batch",
    //   price: 100,
    //   thumbnail: "https://i.ibb.co/VVcTQv2/thbbr.jpg",
    //   stock: 15,
    //   code: "sw10",
    //   status: true,
    // });

    //644488a8c5d37b458e1e7b89
    // await cartModel.create({
    //     products: []
    // })

    // let cart = await cartModel.findById({_id: "6444c09576defc54cd0a9ef2" });
    // cart.products.push({ product: "644488a8c5d37b458e1e7b89" });
    // let resp = await cartModel.findByIdAndUpdate({_id: "6444c09576defc54cd0a9ef2"}, cart)
    
    // console.log(resp)

    let cart = await cartModel.find({_id: "6444c09576defc54cd0a9ef2" })
    console.log(JSON.stringify(cart, null, 2))

  }
};

module.exports = {
  objConfig
};
