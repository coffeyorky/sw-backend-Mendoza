const cartModel = require("../models/carts.model.js");
const  cartsModel  = require("../models/carts.model.js");


class CartDaoMongo {

  get = async () => {
    try {
      return await cartsModel.find().lean();
  } catch (error) {
    console.log(error)
  }
  };
  getCartById = async (cartId) => {
    try {
        const cart = await cartModel.findById(cartId);
        return cart;
    } catch (err) {
        console.error('Error al obtener el carrito por ID:', err.message);
        return err;
    }
};
   save = async () => {
     try {
       return await cartsModel.create({});
   } catch (error) {
     console.log(error)
   }}
  addCart = async (products) => {
    try {
      let cartData = {}
      if (products && products.length > 0) {
        cartData.products = products
      }
      const cart = await cartModel.create(cartData)
      return cart
    } catch (error) {
      console.log(error)
    }
  }

  updateCart = (cid, cartToReplace) => {
    return cartsModel.updateOne({_id: cid}, cartToReplace)
  }

  deleteCart = async (cid) => {
    try {
      return await cartsModel.findByIdAndDelete({_id: cid})
  } catch (error) {
      this.logger.error(error);
      return null;
  }
  }
  deleteById = async (cid)=> {
    try {
        return await cartsModel.findByIdAndDelete({_id: cid})
    } catch (error) {
        console.log(error)
    }
}

addProductInCart = async (cid, obj) => {
    try {
      const filter = { _id: cid, "products._id": obj._id}
      const cart = await cartModel.findById(cid)
      const findProduct = cart.products.some((product) => product._id.toString() === obj._id)
      if (findProduct) {
        const  update = {$inc: {"products.$.quantity": obj.quantity}}
        await cartModel.updateOne(filter, update)
      } else {
        const update = { $push: { products: { _id: obj._id, quantity: obj.quantity}}}
        // await cartModel.updateOne{{_id: cid}, update}
      }
      return await cartModel.findById(cid)
    } catch (error) {
        console.log(error)
    }
}

deleteProductFromCart = async (id, productId) => {
    try {
        const cart = await cartsModel.findById(id);
        cart.products.remove(productId);
        cart.save();
        return true;
    } catch (error) {
        console.log(error)
    }
}

getAllProductsFromCart = async (id) => {
    try {
        return await cartsModel.findById(id).populate('products').select({products: 1, _id:0});
    } catch (error) {
        console.log(error)
    }
}

}

module.exports = CartDaoMongo