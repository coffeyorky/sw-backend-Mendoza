import express from "express";
import ProductManager from "./components/productManager.js";


const app = express()
app.use(express.urlencoded({ extended : true }))

const productos = new ProductManager();
const readProducts = productos.readProducts()

app.get("/products", async (req,res) => {

     let limit = parseInt(req.query.limit);
     if(!limit) return res.send(await readProducts)
     let allProducts = await readProducts
     let prodLmit = allProducts.slice(0, limit)
    
     res.send(prodLmit)
})

 app.get("/products/:id", async (req,res) => {
     let id = parseInt(req.params.id);
     let allProducts = await readProducts;
     let productById = allProducts.find(product => product.id === id)
     res.send(productById)

 })

 const PORT = 8080;
 const serv = app.listen(PORT, () =>{
     console.log(`Express por Local Host ${serv.address().port}`)
 })
 serv.on("error", (error) => console.log(`Error del servidor ${error}`))


