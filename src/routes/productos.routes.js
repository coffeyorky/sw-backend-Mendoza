const { Router } = require('express')
const ProductManager = require("../components/productManager.js");


const ProductRou = Router()
const productos = new ProductManager();

ProductRou.get("/", (req,res) => {
    return res.send("Get de productos")
})

ProductRou.get("/", (req,res) => {
    return res.send("Post de productos")
})

ProductRou.get("/", async (req, res) => {
    res.send(await productos.getProducts())
})

ProductRou.get("/:id", async (req, res) => {
    let id = req.params.id
    res.send(await productos.getProdById(id))
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

module.exports = ProductRou

