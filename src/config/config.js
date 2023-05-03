const { connect } = require("mongoose");
const { ordenes } = require("./ordenes");
const productsModel = require("../models/products.model");

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
    
    //  const insertProducts = async() =>{
    //      const result = await productsModel.insertMany(ordenes)
    //      console.log(result) 
    //  }
    //  insertProducts()

     const product = await productsModel.aggregate([
       {
         $match: {category: `figuras`}
       },
       {
         $group: {_id: `figuras`, promedio: {$avg: `$price`}}
       }
      //  {
      //     $sort: {_id: 1}
      //  }
    //   {
    //      $merge: {
    //       into: "reports"
    //     }
    //   }
     ])
      console.log(product)

  }
};

module.exports = {
  objConfig
};
