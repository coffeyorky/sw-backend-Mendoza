const authSession = (req, res, next)=>{
    if (req.session?.user !== "anakin" && req.session?.admin === true) {
        return res.status(401).send("error de autenticacion")
    }
    next()
}



module.exports = {
    authSession
}