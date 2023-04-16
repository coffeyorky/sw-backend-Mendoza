const {Router} = require("express")

const router = Router()

router.use("/api/usuario", userRouter)
router.use("/api/producto", userRouter)


module.exports = router