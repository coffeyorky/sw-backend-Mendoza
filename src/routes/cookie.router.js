const {Router} = require("express")

const router = Router()

router.get("/set", (req,res)=> {
    res.cookie("CookieProd", "Este es el calor de la cookie", {maxAge: 10000000}).send("cookie seteada")
})

router.get("/get", (req,res)=> {
    res.send(req.cookies)
})

router.get("/get", (req,res)=> {
    res.clearCookie("CookieProd").send("Cookie removed")
})

module.exports = router