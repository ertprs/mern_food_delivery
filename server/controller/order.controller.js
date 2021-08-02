const Order = require("../model/order.model");
const Cart = require("../model/cart.model");

exports.createOrder = async (req, res) => {
  try {
    const userCart = await Cart.findOne({ user: req.user._id });

    if (!userCart) return res.status(201).json({ error: "no order found" });

    const order = new Order({
      user: req.user._id,
      cart: userCart.cartItems,
      suggestion: req.body.suggestion,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      paymentResult: req.body.paymentResult,
      deliveryPrice: req.body.deliveryPrice,
      orderPrice: req.body.orderPrice,
      totalPrice: req.body.totalPrice,
      deliveredAt: req.body.deliveredAt,
    });

    const newOrder = await order.save();
    res.status(201).json({ newOrder });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getSingleOrder = async (req, res) => {
  const _id = req.params.id;

  try {
    await Order.findOne({ _id: _id }, (err, order) => {
      if (err) return res.status(400).json({ err });

      res.status(200).json({ order });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getAllOrder = async (req, res) => {
  const _id = req.params.id;

  try {
    await Order.find({}, (err, order) => {
      if (err) return res.status(400).json({ err });

      res.status(200).json({ order: order.length });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getUserOrder = async (req, res) => {
  try {
    await Order.find({ user: req.user._id }, (err, order) => {
      if (err) return res.status(400).json({ err });

      res.status(200).json({ order });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  const _id = req.params.id;

  try {
    const order = await Order.findOne({ _id: _id });

    if (!order) {
      res.status(400).json({ error: "order not found" });
    } else {
      order.orderStatus = req.body.orderStatus;

      const updateOrder = await order.save();

      res.status(200).json({ updateOrder });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.updateOrderToDelivered = async (req, res) => {
  const _id = req.params.id;

  try {
    const order = await Order.findOne({ _id: _id });

    if (!order) {
      res.status(400).json({ error: "order not found" });
    } else {
      order.isDelivered = req.body.isDelivered;
      order.deliveredAt = Date.now();

      const updateOrder = await order.save();

      res.status(200).json({ updateOrder });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
