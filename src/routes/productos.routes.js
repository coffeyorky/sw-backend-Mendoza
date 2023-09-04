const { Router } = require("express");
const { get, getSend, createProdWithImage, getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/products.controller.js");
const { passportCall } = require("../passport-jwt/passportcall");

const productsController = require("../controllers/products.controller.js");
const { uploader } = require("../utils/uploader.js");
const { authToken } = require("../utils/jsonwebtoken.js");
const checkAuth = require("../middleware/auth.js");
const { authorization } = require("../middleware/rol.js");


const router = Router();

// router.get("/", passportCall("jwt"),authorization("admin"),getProducts);
// router.get("/", get)
router.get("/get", getProducts)
router.get("/", getSend);
router.get("/:pid", getProduct);
router.post('/prod', checkAuth, authorization(["user"]), createProduct);
router.put("/:pid", checkAuth, authorization(["premium"]), updateProduct);
router.delete("/:pid", checkAuth, authorization(["user"]), deleteProduct);
router.post('/withimage', uploader.single('image'), createProdWithImage)

module.exports = router;

