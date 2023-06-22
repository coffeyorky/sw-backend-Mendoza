const { prodService } = require("../service");
const { authSession } = require("../middleware/auth.middleware");
const { authToken } = require("../utils/jsonwebtoken");
const ProductDaoMongo = require("../dao/mongo/products.mongo");

const prodDaoMongo = new ProductDaoMongo()

class ProductController {
  getProducts = async (req, res) => {
    try {
      const { page = 4, limit = 10 } = req.query;
      const { docs, hasPrevPage, prevPage, hasNextPage, nextPage } =
        await prodService.getProducts({ page, limit });
      if (!docs) {
        return res.status(400).send("no hay productos");
      }
      res.status(200).send({
        products: docs,
        hasPrevPage,
        prevPage,
        hasNextPage,
        nextPage,
      });
      //  res.status(200).render(`product`, {
      //    products: docs,
      //    hasPrevPage,
      //    prevPage,
      //    hasNextPage,
      //    nextPage
      //   });
    } catch (error) {
      console.log(error);
    }
  };

  get = async (req, res) => {
    const products = await prodDaoMongo.getProduct()
    res.status(200).send({
      status: "success",
      products
    })
  }

  getProduct = async (req, res) => {
    try {
      res.send("get product by id");
    } catch (error) {
      console.log(error);
    }
  };

  createProduct = async (req, res) => {
    try {
      let { title, description, price, thumbnail, stock, code, status } =
        req.body;
      if (!title || !thumbnail) {
        return res.status(400).send({ message: "pasar todos los datos" });
      }
      let prodAgregado = await prodService.createProduct({
        title,
        description,
        price,
        thumbnail,
        stock,
        code,
        status,
      });
      res.status(201).send({
        prodAgregado,
        message: "producto creado",
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
      let result = await prodService.deleteProduct(pid);
      res.status(200).send({ message: "Producto borrado", result });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new ProductController;
