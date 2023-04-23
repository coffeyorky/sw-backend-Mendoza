const {Router} = require("express")
const productRouter = require("./productos.routes.js")
const { uploader } = require("../utils/uploader.js")

const router = Router()


router.use("/api/productos", productRouter)

router.post("/upload", uploader.single("myFile"), (req, res)=>{
    res.send("Archivo subido correctamente")
})

module.exports = router