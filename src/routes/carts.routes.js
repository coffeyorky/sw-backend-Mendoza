const { Router } = require("express");
const { getCart, postCart, putCart, deleteCart } = require("../controllers/carts.controller");

const router = Router()

router.get("/:cid", getCart);
router.post("/", postCart);
router.put("/:cid", putCart);
router.delete("/:cid", deleteCart);

module.exports = router;