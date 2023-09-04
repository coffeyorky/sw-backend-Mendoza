const cartManager = require("../dao/mongo/cart.mongo");
const cartModel = require("../dao/models/carts.model.js");
const { logger } = require("../config/logger.config");
const { cartService, prodService, usersService } = require("../service");


class CartController {

  getCart = async (req, res) => {
    const { cid } = req.params;
    const resp = await cartService.get(cid);
    res.send(resp);
  };

  postCart = async (req, res, next) => {
    try {
      let { products } = req.body;
      if (!products) {
        return response.status(400).send({ message: "pasar todos los datos" });
      }
      let prodAgregado = await cartService.create(products);
      res.status(201).send({
        prodAgregado,
        message: "producto creado",
      });
    } catch (error) {
      console.log(error);
    }
  };

  putCart = async (req, res) => {
    try {
      const { cid } = req.params;

      let cartToReplace = req.body;
      if (!cartToReplace.products) {
        return res.status(400).send({ message: "pasar todos los datos" });
      }
      let result = await cartService.update(cid, cartToReplace);
      res.status(201).send({
        users: result,
        message: "Carrito Modificado",
      });
    } catch (error) {
      req.logger.error(error);
    }
  };


  deleteCart = async (req, res) => {
    try {
      const { cid } = req.params;
      let result = await cartService.delete(cid);
      res.status(200).send({ cart: result, message: "Carrito borrado" });
    } catch (error) {
      console.log(error);
    }
  };

  deleteProductById = async (id, productId) => {
    try {
      const cart = await cartModel.findById(id);
      cart.products.remove(productId);
      cart.save();
      return true;
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new CartController();
