const express = require("express");
const orderRouter = express.Router();
const {
  createOrder,
  getSingleOrder,
  getAllOrder,
  getUserOrder,
  updateOrderStatus,
  updateOrderToDelivered,
} = require("../controller/order.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

orderRouter.route("/create_order").post(authenticateToken, createOrder);
orderRouter.route("/single_order/:id").get(authenticateToken, getSingleOrder);
orderRouter.route("/all_order").get(authenticateToken, getAllOrder);
orderRouter.route("/user_order").get(authenticateToken, getUserOrder);
orderRouter
  .route("/update_order_status/:id")
  .post(authenticateToken, updateOrderStatus);
orderRouter
  .route("/update_order_delivered/:id")
  .post(authenticateToken, updateOrderToDelivered);

module.exports = orderRouter;
