const chai = require("chai");
const mongoose = require("mongoose");
const UserDaoMongo = require("../src/dao/user.mongo");
const ProductDaoMongo = require("../src/dao/mongo/products.mongo");
const CartDaoMongo = require("../src/dao/mongo/cart.mongo");

mongoose.connect(
  "mongodb+srv://Coffeyorky:thebadbatch123@cluster0.j69jxej.mongodb.net/ecommerce?retryWrites=true&w=majority"
);
const expect = chai.expect;

describe("set de test de chai", () => {
  before(function () {
    this.userDao = new UserDaoMongo();
    this.prodDao = new ProductDaoMongo()
    this.cartDao = new CartDaoMongo()
  });
  beforeEach(function () {
    //mongoose.connection.collections.usuarios.drop();
    this.timeout(5000);
  });
  it("El dao debe poder obtener los usuarios en formato de arreglo", async function () {
    let result = await this.userDao.get();
    console.log(result)
    // expect(result).to.be.deep.equal([]);
    // expect(result).deep.equal([])
     expect(Array.isArray(result)).to.be.ok
    //expect(Array.isArray(result)).to.be.equals(true)
  }).timeout(20000);
  it("El dao debe poder obtener los usuarios en formato de arreglo", async function () {
    let result = await this.prodDao.get();
    console.log(result)
     expect(Array.isArray(result)).to.be.ok
  }).timeout(20000);
  it("El dao debe poder obtener los usuarios en formato de arreglo", async function () {
    let result = await this.cartDao.get();
    console.log(result)
     expect(Array.isArray(result)).to.be.ok
    
  }).timeout(20000);
});
