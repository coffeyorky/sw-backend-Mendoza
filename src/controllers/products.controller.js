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
   get = (req, res) => {
     res.render("product", {});
   };

  getProducts = async (req, res) => {
    try {
      const products = await prodService.get()
      if(products){
         res.json({products})
       } else {
         res.json({message: "No hay productos"})
       }
       res.send({
        status: "success",
        payload: products
      });
    } catch (error) {
      console.log(error);
    }
  };
  
//prueba de get
  getSend = async (req, res) => {
    const products = await productos.readProducts();
    res.status(200).render("product", {
      status: "success",
      products,
    });
  };
//prueba de get
 
  getProduct = async (req, res) => {
    try {
      const { pid } = req.params;
      let result = await prodService.getProduct(pid);
      res.status(201).send({
        producto: result,})
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
        product: result,
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

