import express from "express";
import ProductRou from "./router/productos.routes.js";
import CartRou from "./router/carts.routes.js";

const app = express()
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended : true }));

app.use("/api/productos", ProductRou)
app.use("/api/cart", CartRou)

app.listen(PORT, () => {
    console.log(`Servidor Expres puerto ${PORT}`)
})

