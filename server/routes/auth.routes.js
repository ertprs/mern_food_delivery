const express = require("express");
const authRouter = express.Router();
const {
  googleLogin,
  register,
  login,
} = require("../controller/auth.controller");

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/googleLogin").post(googleLogin);

module.exports = authRouter;
