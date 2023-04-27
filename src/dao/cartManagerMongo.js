const  cartsModel  = require("../models/carts.model.js");

class CartManagerMongo {
  async getCart() {
    const resp = await cartsModel.find()
    console.log(resp)
    return resp
  }
  async getCartById(cid) {
    return "get PRODUCTOS";
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