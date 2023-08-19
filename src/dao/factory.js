const { configObje } = require("../config/config");
const MongoSingleton = require("../utils/MongoSingleton");

let ProductsDaos;
let UsersDaos;
let CartsDaos
let OrderDao

switch ("MONGO") {
  case "MONGO":
    MongoSingleton.getInstance();
    const ProductDaoMongo = require("./mongo/products.mongo");
    ProductsDaos = ProductDaoMongo;

    const UserDaoMongo = require("./user.mongo");
    UsersDaos = UserDaoMongo;

    const CartDaoMongo = require('./mongo/cart.mongo.js')
    CartsDaos = CartDaoMongo

    const OrderDaoMongo = require('./mongo/orders.mongo.js')
    OrderDao = OrderDaoMongo

    break;
  case "MEMORY":
    const ProductDaoMemory = require("./mongo/products.mongo");
    ProductsDaos = ProductDaoMemory;
    break;
  case "FILE":
    break;

  default:
    MongoSingleton.getInstance();
    break;
}

module.exports = {
  ProductsDaos,
  UsersDaos,
  CartsDaos,
  OrderDao
};
