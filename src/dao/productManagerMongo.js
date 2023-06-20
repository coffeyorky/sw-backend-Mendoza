const  {productModel}  = require("../models/products.model.js");

class ProductManagerMongo {
  getProduct = async ({page, limit, query=""}) => {
    let resp = await productModel.paginate({}, {limit, page, lean:true})
    console.log(resp)
    return resp
  }
   getProductsById = async (id) =>{
    return await productModel.findById({_id: id})
  }
  addProduct = async (newProduct) => {
    return await productModel.create(newProduct);
  }
  updateProduct = async (pid, productToReplace) => {
    return await productModel.updateOne({_id: pid}, productToReplace)
  }
  deleteProduct = async (pid) => {
    return await productModel.deleteOne({_id: pid})
  }

}

module.exports = ProductManagerMongo 
