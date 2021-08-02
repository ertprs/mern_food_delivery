const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const debug = require("debug")("express");
const authRouter = require("./routes/auth.routes");
const restaurantsRouter = require("./routes/restaurants.routes");
const productRouter = require("./routes/product.routes");
const cartRouter = require("./routes/cart.routes");
const userRouter = require("./routes/user.routes");
const orderRouter = require("./routes/order.routes");

dotenv.config();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DB_CONFIG, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(
    (res) => {
      console.log("mongodb connected");
    },
    (err) => {
      console.log(err);
    }
  );

app.get("/", (req, res) => {
  res.send("Express server works");
});

app.use("/auth", authRouter);
app.use("/restaurants", restaurantsRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/user", userRouter);
app.use("/order", orderRouter);

app.listen(PORT, () => {
  console.log("listening on port 5000");
});
