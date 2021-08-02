const express = require("express");
const restaurantsRouter = express.Router();
const {
  createRestaurant,
  getRestaurantById,
  getAllRestaurant,
  createRestaurantReview,
} = require("../controller/restaurants.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

restaurantsRouter.route("/create_restaurants").post(createRestaurant);
restaurantsRouter.route("/single_restaurants/:id").get(getRestaurantById);
restaurantsRouter.route("/all_restaurants").get(getAllRestaurant);
restaurantsRouter
  .route("/create_restaurant_review/:id")
  .post(authenticateToken, createRestaurantReview);

module.exports = restaurantsRouter;
