
const productManager = require("../dao/productManagerMongo");
const { authSession } = require("../middleware/auth.middleware");

class ProductController {
  getProducts = async (req, res) => {
    try {
     const { page = 4, limit=10 } = req.query;
     const { docs, hasPrevPage, prevPage, hasNextPage, nextPage } =
       await productManager.getProduct({ page, limit });
     if (!docs) {
       return res.status(400).send("no hay productos");
     }
     res.status(200).render(`product`, {
       products: docs,
       hasPrevPage,
       prevPage,
       hasNextPage,
       nextPage
      });   
      console.log(render)
  } catch (error) {
      console.log(error)
  }

  };

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
      let prodAgregado = await productManager.addProduct({
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
      let result = await productManager.updateProduct(pid, productToReplace);
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
      let result = await productManager.deleteProduct(pid);
      res.status(200).send({ message: "Producto borrado", result });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = ProductController;
