const mongoose = require("mongoose");
const UserDaoMongo = require("../src/dao/user.mongo.js");
const Assert = require("assert");

mongoose.connect(
  "mongodb+srv://Coffeyorky:thebadbatch123@cluster0.j69jxej.mongodb.net/ecommerce?retryWrites=true&w=majority"
);

const assert = Assert.strict;

describe("Testing User Dao", () => {
  before(function () {
    this.userDao = new UserDaoMongo();
  });
  beforeEach(function () {
    mongoose.connection.collections.usuarios.drop();
    this.timeout(5000);
  });
  it("Nuestro dao debe poder obtener un array con usuarios", async function () {
    console.log(this.userDao);
    const result = await this.userDao.get();
    assert.strictEqual(Array.isArray(result), true);
  }).timeout(20000);
  it("Nuestro dao debe poder agregar un usuario a la base de datos, correctamente", async function () {
    let mockUser = {
      first_name: "Bode",
      last_name: "Akuna",
      email: "kate@kate",
      password: "bode",
    };
    const result = await this.userDao.save(mockUser);
    assert.ok(result._id);
    assert.deepStrictEqual(result.pets, []);
  }).timeout(20000);
  it("el dao puede obtener un usuario por email", async function () {
    let mockUser = {
      first_name: "Bode",
      last_name: "Akuna",
      email: "kate@kate",
      password: "bode",
    };
    const result = await this.userDao.save(mockUser)
    let userDb = await this.userDao.getById({email: "kate@kate"})
    assert.strictEqual(userDb.email, "kate@kate")
  });
});
