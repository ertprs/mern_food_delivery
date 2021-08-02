const express = require("express");
const userRouter = express.Router();
const {
  updateHomeAddress,
  updateWorkAddress,
  getUserData,
} = require("../controller/user.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

userRouter
  .route("/update_home_address")
  .post(authenticateToken, updateHomeAddress);

userRouter
  .route("/update_work_address")
  .post(authenticateToken, updateWorkAddress);

userRouter.route("/get_user_data").get(authenticateToken, getUserData);

module.exports = userRouter;
