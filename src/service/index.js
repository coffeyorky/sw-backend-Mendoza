const { UsersDaos, OrderDao, ProductsDaos, CartsDaos } = require("../dao/factory");
const ProductManagerMongo = require("../dao/mongo/product.mongo");
const CartRepository = require("../repositories/cart.repository");
const OrderRepository = require("../repositories/orders.repository");
const ProductRepository = require("../repositories/product.repository");
const UserRepository = require("../repositories/user.repositories")

const cartService = new CartRepository(new CartsDaos())
const prodService = new ProductRepository( new ProductsDaos())
const usersService = new UserRepository (new UsersDaos())
const orderService = new OrderRepository(new OrderDao())

module.exports = {
    cartService,
    prodService,
    usersService,
    orderService
}