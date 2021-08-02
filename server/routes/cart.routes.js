const express = require("express");
const cartRouter = express.Router();
const {
  addToCart,
  deleteUserCart,
  getUserCart,
  decreaseCartItem,
} = require("../controller/cart.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

cartRouter.route("/add_to_cart").post(authenticateToken, addToCart);
cartRouter.route("/delete_cart").get(authenticateToken, deleteUserCart);
cartRouter.route("/get_user_cart").get(authenticateToken, getUserCart);
cartRouter
  .route("/decrease_Cart_Item")
  .post(authenticateToken, decreaseCartItem);

module.exports = cartRouter;
