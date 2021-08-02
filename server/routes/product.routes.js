const express = require("express");
const productRouter = express.Router();
const { createProduct } = require("../controller/product.controller");

productRouter.route("/create_product").post(createProduct);

module.exports = productRouter;
