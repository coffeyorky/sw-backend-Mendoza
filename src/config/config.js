const { connect } = require("mongoose");
const productsModel = require("../models/products.model");

let url =
  "mongodb+srv://Coffeyorky:thebadbatch123@cluster0.j69jxej.mongodb.net/ecommerce?retryWrites=true&w=majority";

const objConfig = {
  connectDB: async () => {
    try {
      await connect(url);
      console.log("base de datos conectada");
    } catch (error) {
      console.log(error);
    }
    await productsModel.create({
      title: "Remera Bad batch",
      description:
        "Remera de talla universal con estampado de los personajes de la serie The Bad Batch",
      price: 100,
      thumbnail: "https://i.ibb.co/VVcTQv2/thbbr.jpg",
      stock: 15,
      code: "sw10",
      status: true,
    });
  },
};

module.exports = {
  objConfig,
};
