const ProductManagerMongo = require("../dao/productManagerMongo");
// const UserManagerMongo = require("../dao/userManagerMongo")

const prodService = new ProductManagerMongo()
// const usersService = new UserManagerMongo()

module.exports = {
    prodService
}