const { connect } = require("mongoose");
const { logger } = require("./logger");

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
      logger.info("esta conectada");
      return this.#instance;
    }
    this.#instance = new MongoSingleton();
    logger.info("connected");
    return this.#instance;
  }
}

module.exports = MongoSingleton;
