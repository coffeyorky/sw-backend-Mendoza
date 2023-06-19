const { Router } = require("express");
const productManager = require("../dao/productManagerMongo");
const { authSession } = require("../middleware/auth.middleware");
const ProductController = require("../controllers/products.controller");
const { passportCall } = require("../passport-jwt/passportcall");
const { authorization } = require("../passport-jwt/authorization.middleware");

const router = Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } =
  new ProductController();

// router.get("/", passportCall("jwt"),authorization("admin"),getProducts);
router.get("/", getProducts);
router.get("/:pid", getProduct);

router.post("/", createProduct);

router.put("/:pid", updateProduct);
router.delete("/:pid", deleteProduct);

// router.get("/", authSession, async (req, res) => {
//   try {
//     const { page = 1, limit=4 } = req.query;
//     const { docs, hasPrevPage, prevPage, hasNextPage, nextPage } =
//       await productManager.getProduct({ page, limit });
//     if (!docs) {
//       return res.status(400).send("no hay productos");
//     }
//     res.status(200).render(`product`, {
//       products: docs,
//       hasPrevPage,
//       prevPage,
//       hasNextPage,
//       nextPage,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
