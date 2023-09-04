const bcrypt = require("bcrypt")

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const isValidPassword = async(user, password) => bcrypt.compareSync(password, user.password)
module.exports = {
    createHash, isValidPassword
}

// const bcrypt = require("bcrypt")

// const createHash = async(password) =>{
//     const salts = await bcrypt.genSalt(10);
//     return await bcrypt.hash(password,salts);
// }

// const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

// module.exports = {
//     createHash, isValidPassword
// }
