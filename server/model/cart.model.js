const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    cartItems: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
        quantity: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    restaurant: { type: mongoose.Types.ObjectId, ref: "Restaurants" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
