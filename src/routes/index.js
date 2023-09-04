const {Router} = require("express")
const productRouter = require("./productos.routes.js")
// const cartRouter = require("./carts.routes.js")
const { uploader } = require("../utils/uploader.js")
const errorHandler = require("../middleware/errors")

const router = Router()

// router.use("/api/carts", cartRouter)
router.use("/api/productos", productRouter)

router.post("/upload", uploader.single("myFile"), (req, res)=>{
    res.send("Archivo subido correctamente")
})

router.use(errorHandler)

module.exports = router