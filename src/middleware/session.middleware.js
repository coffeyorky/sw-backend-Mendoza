
let midSession = function (req, res, next) {
    try {
        if(!req.session.user) {
            return res.redirect("/session/login")
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    midSession
}