const Cart = require("../model/cart.model");

exports.addToCart = async (req, res) => {
  await Cart.findOne({ user: req.user._id }, (err, cart) => {
    if (err) return res.status(400).json({ err });

    if (cart) {
      const product = req.body.cartItems.product;

      const isItemAdded = cart.cartItems?.find((c) => c.product == product);

      if (isItemAdded) {
        Cart.findOneAndUpdate(
          { user: req.user._id, "cartItems.product": product },
          {
            $set: {
              "cartItems.$.quantity":
                isItemAdded.quantity + req.body.cartItems.quantity,
              "cartItems.$.price": isItemAdded.price + req.body.cartItems.price,
            },
          },
          { new: true }
        ).exec((error, cart) => {
          if (error) return res.status(400).json({ error });
          res.status(200).json({ cart });
        });
      } else {
        Cart.findOneAndUpdate(
          { user: req.user._id },
          {
            $push: {
              cartItems: req.body.cartItems,
            },
          },
          { new: true }
        ).exec((error, cart) => {
          if (error) return res.status(400).json({ error });
          res.status(200).json({ cart });
        });
      }
    } else {
      const cart = new Cart({
        user: req.user._id,
        cartItems: req.body.cartItems,
        restaurant: req.body.restaurant,
      });

      try {
        cart.save((err, result) => {
          if (err) return res.status(400).json({ err });

          res.status(201).json({ result });
        });
      } catch (error) {
        res.status(400).json({ error });
      }
    }
  });
};

exports.deleteUserCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user._id });
    res.status(200).json({ message: "user cart deleted" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const userCart = await Cart.findOne({ user: req.user._id })
      .populate({
        path: "cartItems.product",
        model: "Product",
      })
      .populate("restaurant")
      .exec();

    res
      .status(200)
      .json({ userCart: userCart.cartItems, restaurant: userCart.restaurant });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.decreaseCartItem = async (req, res) => {
  await Cart.findOne({ user: req.user._id }, (err, cart) => {
    if (err) return res.status(400).json({ err });

    if (!cart) {
      res.status(400).json({ error: "cant find your cart" });
    } else {
      const product = req.body.cartItems.product;
      const isItemAdded = cart.cartItems?.find((c) => c.product == product);

      if (isItemAdded && isItemAdded?.quantity === 1) {
        Cart.updateOne(
          {
            user: req.user._id,
            "cartItems.product": product,
          },
          {
            $pull: {
              cartItems: { product: product },
            },
          },
          { safe: true, multi: true }
        ).exec((error, cart) => {
          if (error) return res.status(400).json({ error });
          res.status(200).json({ message: "product deleted" });
        });
      } else {
        Cart.findOneAndUpdate(
          {
            user: req.user._id,
            "cartItems.product": product,
          },
          {
            $set: {
              "cartItems.$.quantity":
                isItemAdded?.quantity - req.body.cartItems.quantity,
              "cartItems.$.price":
                isItemAdded?.price - req.body.cartItems.price,
            },
          },
          { new: true }
        ).exec((error, cart) => {
          if (error) return res.status(400).json({ error });
          res.status(200).json({ cart });
        });
      }
    }
  });
};
