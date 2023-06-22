const { connect } = require("mongoose");

class MongoSingleton {
  static #instance;
  constructor() {
    connect(
      "mongodb+srv://Coffeyorky:thebadbatch123@cluster0.j69jxej.mongodb.net/ecommerce?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }

  static getInstance() {
    if (this.#instance) {
      console.log("esta conectada");
      return this.#instance;
    }
    this.#instance = new MongoSingleton();
    console.log("connected");
    return this.#instance;
  }
}

module.exports = MongoSingleton;
