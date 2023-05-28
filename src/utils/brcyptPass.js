const bcrypt = require("bcrypt")

const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const checkValidPassword = ({ password, hashedPassword }) => bcrypt.compareSync(password, hashedPassword)

module.exports = {
    createHash, checkValidPassword
}
