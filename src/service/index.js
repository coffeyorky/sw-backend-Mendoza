const { UsersDaos, OrderDao, ProductsDaos } = require("../dao/factory");
const ProductManagerMongo = require("../dao/mongo/product.mongo");
const OrderRepository = require("../repositories/orders.repository");
const ProductRepository = require("../repositories/product.repository");
const UserRepository = require("../repositories/user.repositories")


const prodService = new ProductRepository( new ProductsDaos())
const usersService = new UserRepository (new UsersDaos())
const orderService = new OrderRepository(new OrderDao())

module.exports = {
    prodService,
    usersService,
    orderService
}