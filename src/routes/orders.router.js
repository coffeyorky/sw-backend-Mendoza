const { Router } = require("express");
const { OrderController } = require("../controllers/orders.controller");

const router = Router();
const orderController = new OrderController();
router
  .get("/", orderController.getOrders)
  .get("/:oid", orderController.getOrder)
  .post("/", orderController.createOrder)
  .put("/:oid", orderController.updateOrder)
  .delete("/:oid", orderController.deleteOrder);

module.exports = router;
