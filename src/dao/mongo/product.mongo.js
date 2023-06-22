// const { productModel } = require("../../models/products.model.js");

// class ProductManagerMongo {
//   constructor() {
//     this.productModel = productModel;
//   }
//   getProduct = async ({ page, limit, query = "" }) => {
//     let resp = await this.productModel.paginate(
//       {},
//       { limit, page, lean: true }
//     );
//     console.log(resp);
//     return resp;
//   };
//   getProductsById = async (id) => {
//     return await this.productModel.findById({ _id: id });
//   };
//   addProduct = async (newProduct) => {
//     return await this.productModel.create(newProduct);
//   };
//   updateProduct = async (pid, productToReplace) => {
//     return await this.productModel.updateOne({ _id: pid }, productToReplace);
//   };
//   deleteProduct = async (pid) => {
//     return await this.productModel.deleteOne({ _id: pid });
//   };
// }

// module.exports = ProductManagerMongo;
