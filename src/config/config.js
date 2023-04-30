const { connect } = require("mongoose");
const { ordenes } = require("./ordenes");
const { orderModel } = require("../models/orders.model");
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
    
    // let result = await orderModel.insertMany(ordenes)

    // let result = await orderModel.find({})
    // console.log(result)
     
    let result = await productsModel.find({})
    console.log(result)

    const product = await productsModel.aggregate([
      {
        $match: {size: `medium`}
      },
      {
        $group:{_id: `$title`, totalquantity: {$sum: "$quantity"}}
      },
      {
        $sort: {totalquantity: -1 }
      },
       {
         $group: {_id: 1, orders: {$push: `$$ROOT`}}
       },
      {
        $project:{
          "_id": 0,
          orders: "$orders"
        }
      },
      {
         $merge: {
          into: "reports"
        }
      }
    ])
      console.log(product)

  }
};

module.exports = {
  objConfig
};
