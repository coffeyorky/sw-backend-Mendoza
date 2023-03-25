import { Router } from "express";
import ProductManager from "../components/productManager.js";

const ProductRou = Router()
const productos = new ProductManager();


ProductRou.get("/", async (req, res) => {
    res.send(await productos.getProducts())
})

ProductRou.get("/:id", async (req, res) => {
    let id = req.params.id
    res.send(await productos.getProducts(id))
})

ProductRou.post("/", async (req,res) => {
    let newProduct = req.body
    res.send(await productos.addProducts(newProduct))
  })

ProductRou.put("/:id", async (req,res) => {
    let id = req.params.id
    let actuProduct = req.body;
    res.send(await productos.updateProducts(id, actuProduct))
})

ProductRou.delete("/:id", async (req,res) => {
    let id = req.params.id
    res.send(await productos.deleteProducts(id))
})

export default ProductRou

