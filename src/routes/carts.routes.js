const { Router } = require("express");
const cartManager = require("../dao/cartManagerMongo");
const { cartModel } = require("../models/carts.model");

const router = Router()

router.get("/:cid", async (req, res) => {
  const {cid}= req.params
  const resp = await cartModel.findOne({});
  res.send(resp);
});


router.post("/", async (req, res) => {
  try {
    let { products } = req.body;
    if (!products) {
      return response.status(400).send({ message: "pasar todos los datos" });
    }
    let prodAgregado = await cartManager.addCart({
        products
    });
    res.status(201).send({
      prodAgregado,
      message: "producto creado",
    });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:cid", async (req, res) => {
  try {
  const { cid } = req.params;

  let cartToReplace = req.body;
  if (
    !cartToReplace.products
  ) {
    return res.status(400).send({ message: "pasar todos los datos" });
  }
  let result = await cartManager.updateCart(cid, cartToReplace);
  res.status(201).send({
    users: result,
    message: "Carrito Modificado",
  });    
  } catch (error) {
    console.log(error)
  }

});

router.delete("/:cid", async (req, res) => {
  try {
  const { cid } = req.params;
  let result = await cartManager.deleteCart(cid);
  res.status(200).send({ message: "Carrito borrado", result });    
  } catch (error) {
    console.log(error)
  }

});

module.exports = router;



// const { Router } = require('express')
// const CartManager = require("../components/CartManager.js");

// const CartRouter = Router()
// const carts = new CartManager

// CartRouter.post("/", async (req, res) => {
//     const resp = await carts.createCart({productos: []})
//     res.send({resp})
// })

// CartRouter.get("/", async (req, res) => {
//     res.send(await carts.leeArch())
// })

// CartRouter.get("/:cid", async (req, res) => {
//     const {cid} = req.params
//     const resp = await carts.getCartById(parseInt(cid))
//     res.send({resp})
// })  

// CartRouter.post("/:cid/products/:pid", async (req,res) => {
//     const {cid, pid} = req.params
//     const resp = await carts.addProductInCart(parseInt(cid), paseInt(pid))
//     res.send({resp})
// })



// module.exports = {CartRouter}