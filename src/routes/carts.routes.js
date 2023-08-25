const { Router } = require("express");
const { getCart, postCart, putCart, deleteCart, addProdCart, putProdCart } = require("../controllers/carts.controller");

const router = Router()

router.get("/", getCart);
router.post("/cart", postCart);
router.put("/:cid", putCart);
router.post("/prodCart", addProdCart)
router.put("/pcart", putProdCart)
router.delete("/:cid", deleteCart);

module.exports = router;