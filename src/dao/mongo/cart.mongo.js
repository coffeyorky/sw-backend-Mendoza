const  cartsModel  = require("../models/carts.model.js");
const { logger } = require("../../utils/logger.js");

class CartDaoMongo {
  // getCart = () => {
  //   const resp = cartsModel.find()
  //   logger.info(resp)
  //   return resp
  // }
  get = (params) => {
    return cartsModel.find(params);
  };
  getCartById = (id) => {
   return cartsModel.findById(id)
  }
  save = (newCart) => {
    return cartsModel.create(newCart);
  }
  updateCart = (cid, cartToReplace) => {
    return cartsModel.updateOne({_id: cid}, cartToReplace)
  }
  deleteCart = (cid) => {
    return cartsModel.deleteOne({_id: cid})
  }
}

module.exports = CartDaoMongo