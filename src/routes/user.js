const ClassRouter  = require("./router.js")

class UserRouter extends ClassRouter {
    init(){
        this.get("/", ["PUBLIC"], (req, res)=> {
            res.sendSuccess("hola coder")
        })

    }
}


module.exports = {
    UserRouter
}