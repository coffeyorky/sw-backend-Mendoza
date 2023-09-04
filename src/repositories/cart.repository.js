const cartModel = require("../dao/models/carts.model");
// const { cartService } = require("../service");

class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }
  get = (params) => {
    return this.dao.get(params);
  };
  getById = (id) => {
    return this.dao.getById(id);
  };
  create = async (newCart) => {
    return this.dao.save(newCart);
  };
  saveProductToCart = async (id, obj) =>{
    try {
        const cart = await cartModel.findById(id)
        cart.products.push(obj.productId);
        cart.save();
        return true;
    } catch (error) {
      console.log(error)
    }
}
  update = (uid, cartToReplace) => {
    return this.dao.updateOne({ _id: uid }, cartToReplace);
  };
  delete = (id) => {
    return this.dao.deleteCart(id);
  };
}

module.exports = CartRepository;
