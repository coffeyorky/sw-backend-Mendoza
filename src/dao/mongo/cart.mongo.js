const  cartsModel  = require("../models/carts.model.js");
const { logger } = require("../../utils/logger.js");

class CartManagerMongo {
  async getCart() {
    const resp = await cartsModel.find()
    logger.info(resp)
    return resp
  }
  async getCartById(id) {
   return await cartsModel.findById({_id: id})
  }
  async addCart(newCart) {
    return await cartsModel.create(newCart);
  }
  async updateCart(cid, cartToReplace) {
    return await cartsModel.updateOne({_id: cid}, cartToReplace)
  }
  async deleteCart(cid) {
    return await cartsModel.deleteOne({_id: cid})
  }

}

module.exports = new CartManagerMongo();