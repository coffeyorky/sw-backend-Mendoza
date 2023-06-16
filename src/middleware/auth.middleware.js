const authSession = (req, res, next)=>{
    if (req.session?.user?.email !== "adminCoder@coder.com" && !req.session?.user?.admin) {
        return res.status(401).send("error de autenticacion")
    }
    next()
}

module.exports = {
    authSession
}