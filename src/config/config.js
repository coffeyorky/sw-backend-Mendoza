const { connect } = require("mongoose");
const { commander } = require("../utils/commander");
// const { ordenes } = require("./ordenes");
// const productsModel = require("../models/products.model");

const {mode} = commander.opts()
console.log(mode)

require('dotenv').config({
  path: mode === 'development' ? './.env.development':'./.env.production'
})

let url =
  "mongodb+srv://Coffeyorky:thebadbatch123@cluster0.j69jxej.mongodb.net/ecommerce?retryWrites=true&w=majority";

module.exports = {
  port: process.env.PORT || 8080,
  mongoURL: process.env.MONGO_URL,
  adminName: process.env.ADMIN || "",
  adminPassword: process.env.SECRET || "",
  jwtSigned: process.env.SECRETO || "",
  connectDB: () => {
    try {
      connect(url);
      console.log("base de datos conectada");
    } catch (error) {
      console.log(error);
    }

    //  const insertProducts = async() =>{
    //      const result = await productsModel.insertMany(ordenes)
    //      console.log(result)
    //  }
    //  insertProducts()
    //  const product = await productsModel.aggregate([
    //    {
    //      $match: {category: `figuras`}
    //    },
    //    {
    //      $group: {_id: `figuras`, promedio: {$avg: `$price`}}
    //    }
    //  {
    //     $sort: {_id: 1}
    //  }
    //   {
    //      $merge: {
    //       into: "reports"
    //     }
    //   }
    //  ])
    //   console.log(product)
  },
  url: "mongodb+srv://Coffeyorky:thebadbatch123@cluster0.j69jxej.mongodb.net/ecommerce?retryWrites=true&w=majority",
};
