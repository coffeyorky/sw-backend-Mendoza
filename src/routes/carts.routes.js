const { Router } = require('express')
const CartManager = require("../components/CartManager.js");

const CartRouter = Router()
const carts = new CartManager

CartRouter.post("/", async (req, res) => {
    const resp = await carts.createCart({productos: []})
    res.send({resp})
})

CartRouter.get("/", async (req, res) => {
    res.send(await carts.leeArch())
})

CartRouter.get("/:cid", async (req, res) => {
    const {cid} = req.params
    const resp = await carts.getCartById(parseInt(cid))
    res.send({resp})
})  

CartRouter.post("/:cid/products/:pid", async (req,res) => {
    const {cid, pid} = req.params
    const resp = await carts.addProductInCart(parseInt(cid), paseInt(pid))
    res.send({resp})
})



module.exports = {CartRouter}