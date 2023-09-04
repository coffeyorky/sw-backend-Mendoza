const { Router } = require("express");
const { getCart, postCart, putCart, deleteCart} = require("../controllers/carts.controller");
const { midSession } = require("../middleware/session.middleware");

const { passportCall } = require("../passport-jwt/passportcall");
const { authorization } = require("../middleware/rol");
const checkAuth = require("../middleware/auth");

const router = Router()
// midSession, passportCall("jwt"), authorization("user"),

router.get("/", checkAuth, authorization(["user", "admin", "premium"]), getCart);
router.post("/carts", checkAuth, authorization(["user", "admin", "premium"]), postCart);
router.put("/", checkAuth, authorization(["user", "admin", "premium"]), putCart);
router.delete("/deleteCart/:cid",  checkAuth, authorization(["user", "admin", "premium"]), deleteCart);

module.exports = router;
