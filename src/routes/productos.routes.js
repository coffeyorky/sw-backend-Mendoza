const { Router } = require("express");
const { get, createProdWithImage, getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/products.controller.js");
const { passportCall } = require("../passport-jwt/passportcall");
const { authorization } = require("../passport-jwt/authorization.middleware");
const productsController = require("../controllers/products.controller.js");
const { uploader } = require("../utils/uploader.js");

const router = Router();

// router.get("/", passportCall("jwt"),authorization("admin"),getProducts);
router.get("/", get);
router.get("/getprod", getProduct);
router.post('/prod', createProduct);
router.put("/:pid", updateProduct);
router.delete("/:pid", deleteProduct);
router.post('/withimage', uploader.single('image'), createProdWithImage)

module.exports = router;
