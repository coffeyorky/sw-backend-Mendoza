const {Router} = require("express")
const userRouter = require("./user.router.js")
const productRouter = require("./productos.routes.js")
const { uploader } = require("../utils/uploader.js")

const router = Router()

router.use("/api/usuario", userRouter)
router.use("/api/producto", productRouter)

router.post("/upload", uploader.single("myFile"), (req, res)=>{
    res.send("Archivo subido correctamente")
})

module.exports = router