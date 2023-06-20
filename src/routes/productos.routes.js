const { Router } = require("express");
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/products.controller");
const { passportCall } = require("../passport-jwt/passportcall");
const { authorization } = require("../passport-jwt/authorization.middleware");

const router = Router();

// router.get("/", passportCall("jwt"),authorization("admin"),getProducts);
router.get("/", getProducts);
router.get("/:pid", getProduct);

router.post("/", createProduct);

router.put("/:pid", updateProduct);
router.delete("/:pid", deleteProduct);

module.exports = router;
