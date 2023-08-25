const cartManager = require("../dao/mongo/cart.mongo");
const cartModel = require("../dao/models/carts.model.js");
const { logger } = require("../utils/logger");
const { cartService } = require("../service");
const productModel = require("../dao/models/products.model");

class CartController {
  getCart = async (req, res) => {
    const { cid } = req.params;
    const resp = await cartService.get();
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
  
  addProdCart = async (req, res) => {
    try {
      const { title, thumbnail, price } = req.body;
      const existProd = await productModel.findOne({ title });

      const noVacio = title !== "" && thumbnail !== "" && price !== "";
      const enCarrito = await cartModel.findOne({ title });
      if (!existProd) {
        res.status(400).json({
          message: "Este producto no se encuentra en la base de datos",
        });
      } else if (noVacio && !enCarrito) {
        const newProdInCart = new cartModel({ title, thumbnail, price, amount: 1 });

        await productModel
          .findByIdAndUpdate(
            existProd?._id,
            { inCart: true, title, thumbnail, price },
            { new: true }
          )
          .then((product) => {
            newProdInCart.save();
            res.json({
              message: "El producto fue agregado al carrito",
              product,
            });
          })
          .catch((error) => console.error(error));
      } else if (enCarrito) {
        res.status(400).json({
          message: "El producto ya esta en el carrito",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  putProdCart = async (req, res) => {
    try {
      const { productId } = req.params
      const { query } = req.query
      const body = req.body 

      const prodBusc = await cartModel.findById(productId)
      if(!query) {
        res.status(404).json({ message: "Debes enviar una query"})
      } else if (prodBusc && quert === "add") {
        body.amount = body.amount + 1
        await cartModel.findByIdAndUpdate( productId, body, {
          new: true,
        }).then((product) => {
          res.json({
            message: `El producto: ${product.title} fue actualizado`,
            product
          })
        })
      } else if (prodBusc && query === "del") {
        body.amount = body.amount - 1
        await cartModel.findByIdAndUpdate(productId, body, {
          new: true,
        }).then((product) => 
        red.json({
          message: `El producto: ${product.title} fue actualizado`,
          product
        }))
      } else {
        res.status(400).json({ message: "Hubo un error"})
      }
    } catch (error) {
      console.log(error)
    }
  }

  deleteCart = async (req, res) => {
    try {
      const { cid } = req.params;
      let result = await cartService.delete(cid);
      res.status(200).send({ message: "Carrito borrado", result });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new CartController();
