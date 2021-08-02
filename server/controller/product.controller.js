const Product = require("../model/product.model");
const Restaurants = require("../model/restaurants.model");

exports.createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
      inStock: req.body.inStock,
      category: req.body.category,
      isVeg: req.body.isVeg,
    });

    const newMenu = await Restaurants.findOneAndUpdate(
      { _id: req.body.restaurantsId },
      {
        $push: { menu: product._id },
      },
      { new: true }
    );

    const newProduct = await product.save();
    res.status(201).json({ newProduct });
  } catch (error) {
    res.status(400).json({ error });
  }
};
