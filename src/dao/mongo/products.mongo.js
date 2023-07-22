const productModel = require("../models/products.model");

class ProductDaoMongo {
  // getProduct = async ({page, limit, query=""}) => {
  //     let resp = await this.productModel.paginate({}, {limit, page, lean:true})
  //     console.log(resp)
  //     return resp
  //   }

  get = (params) => {
    return productModel.find(params);
  };
  getBy = (id) => {
    return productModel.findById({ _id: id });
  };
  save = (newProduct) => {
    return productModel.create(newProduct);
  };
  updateProduct = (pid, productToReplace) => {
    return productModel.updateOne({ _id: pid }, productToReplace);
  };
  deleteProduct = (pid) => {
    return productModel.deleteOne({ _id: pid });
  };
}

module.exports = ProductDaoMongo;
