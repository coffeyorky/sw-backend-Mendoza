const  productModel  = require("../models/products.model.js");

class ProductManagerMongo {
  async getProduct() {
    const resp = await productModel.find().lean()
    console.log(resp)
    return resp
  }
  async getProductsById(pid) {
    return "get PRODUCTOS";
  }
  async addProduct(newProduct) {
    return await productModel.create(newProduct);
  }
  async updateProduct(pid, productToReplace) {
    return await productModel.updateOne({_id: pid}, productToReplace)
  }
  async deleteProduct(pid) {
    return await productModel.deleteOne({_id: pid})
  }

}

module.exports = new ProductManagerMongo();
