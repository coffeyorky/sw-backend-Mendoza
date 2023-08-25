const { prodService, cartService } = require("../service");
const { authSession } = require("../middleware/auth.middleware");
const { authToken } = require("../utils/jsonwebtoken");
const ProductDaoMongo = require("../dao/mongo/products.mongo");
const ProdDto = require("../dto/product.dto");
const ProductManager = require("../components/productManager");
const productModel = require("../dao/models/products.model");
const cartModel = require("../dao/models/carts.model");

const prodDaoMongo = new ProductDaoMongo();
const productos = new ProductManager();

class ProductController {

  getProducts = async (req, res) => {
    try {
      const products = await productModel.find()
      if(products){
        res.json({products})
      } else {
        res.json({message: "No hay productos"})
      }
    } catch (error) {
      console.log(error);
    }
  };
  // try {
  //   const { page = 4, limit = 10 } = req.query;
  //   const { docs, hasPrevPage, prevPage, hasNextPage, nextPage } =
  //     await prodService.get({ page, limit });
  //   if (!docs) {
  //     return res.status(400).send("no hay productos");
  //   }
  //   res.status(200).send({
  //     products: docs,
  //   });
  //   //  res.status(200).render(`product`, {
  //   //    products: docs,
  //   //    hasPrevPage,
  //   //    prevPage,
  //   //    hasNextPage,
  //   //    nextPage
  //   //   });
  // } catch (error) {
  //   console.log(error);
  // }

  getSend = async (req, res) => {
    const products = await productos.readProducts();
    res.status(200).render("product", {
      status: "success",
      products,
    });
  };

  getProduct = async (req, res) => {
    try {
      res.send("get product by id");
    } catch (error) {
      console.log(error);
    }
  };

  createProduct = async (req, res, next) => {
    try {
      const {
        title,
        description,
        price,
        thumbnail,
        category,
        stock,
        code,
        status,
      } = req.body;
      if (!title || !category || !stock) {
        return res
          .status(400)
          .send({ status: "error", error: "pasar todos los datos" });
      }
      const prod = ProdDto.getProdInputFrom({
        title,
        description,
        price,
        thumbnail,
        category,
        stock,
        code,
        status,
      });
      const result = await prodService.create(prod);
      res.status(201).send({
        status: "success",
        payload: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateProduct = async (req, res) => {
    try {
      const { pid } = req.params;
      let productToReplace = req.body;
      if (
        !productToReplace.title ||
        !productToReplace.thumbnail ||
        !productToReplace.price ||
        !productToReplace.code
      ) {
        return res.status(400).send({ message: "pasar todos los datos" });
      }
      let result = await prodService.updateProd(pid, productToReplace);
      res.status(201).send({
        users: result,
        message: "Producto Modificado",
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { pid } = req.params;
      let result = await prodService.deleteItem(pid);
      res.status(200).send({ message: "Producto borrado", result });
    } catch (error) {
      console.log(error);
    }
  };

  createProdWithImage = async (req, res) => {
    try {
      const file = req.file;
      const { title, category, stock } = req.body;
      if (!title || !category || !stock)
        return res
          .status(400)
          .send({ status: "error", error: "Incomplete values" });
      console.log(file);
      const prod = ProdDto.getProdInputFrom({
        title,
        category,
        stock,
        image: `${__dirname}/../public/uploads${file.filename}`,
        //image,
      });
      console.log("prod:", prod);
      const result = await prodService.create(prod);
      res.send({ status: "success", payload: result });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new ProductController();
