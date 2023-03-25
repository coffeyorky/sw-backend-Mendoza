import { Router } from "express";
import CartManager from "../components/CartManager.js";

const CartRou = Router()
const carts = new CartManager

CartRou.post("/", async (req, res) => {
    const resp = await carts.createCart({productos: []})
    res.send({resp})
})

CartRou.get("/", async (req, res) => {
    res.send(await carts.leeArch())
})

CartRou.get("/:cid", async (req, res) => {
    const {cid} = req.params
    const resp = await carts.getCartById(parseInt(cid))
    res.send({resp})
})  

CartRou.post("/:cid/products/:pid", async (req,res) => {
    const {cid, pid} = req.params
    const resp = await carts.addProductInCart(parseInt(cid), paseInt(pid))
    res.send({resp})
})


export default CartRou