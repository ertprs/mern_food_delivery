const Restaurants = require("../model/restaurants.model");

exports.createRestaurant = async (req, res) => {
  try {
    const restaurants = new Restaurants({
      name: req.body.name,
      image: req.body.image,
      cuisine: req.body.cuisine,
      address: req.body.address,
      costForTwo: req.body.costForTwo,
      DeliveryTime: req.body.DeliveryTime,
      rating: req.body.rating,
      couponCode: req.body.couponCode,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    });

    const newRestaurant = await restaurants.save();
    res.status(201).json({ newRestaurant });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getRestaurantById = async (req, res) => {
  const _id = req.params.id;

  try {
    const restaurantDetails = await Restaurants.findOne({ _id: _id }).populate(
      "menu"
    );
    res.status(200).json({ restaurantDetails });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getAllRestaurant = async (req, res) => {
  try {
    await Restaurants.find((err, result) => {
      if (err) {
        res.status(400).json({ err });
      }

      res.status(200).json({ result });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.createRestaurantReview = async (req, res) => {
  const _id = req.params.id;

  const restaurant = await Restaurants.findById(_id);

  if (restaurant) {
    const alreadyReviewed = restaurant.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed)
      return res.status(400).json({ messgage: "Already reviewed" });

    const review = {
      name: req.user.name,
      rating: req.body.rating,
      comment: req.body.comment,
      user: req.user._id,
    };

    restaurant.reviews.push(review);

    restaurant.numReviews = restaurant.reviews.length;

    restaurant.rating =
      restaurant.reviews.reduce((acc, item) => item.rating + acc, 0) /
      restaurant.reviews.length;

    await restaurant.save();
    res.status(201).json({ message: "Review added", restaurant });
  } else {
    return res.status(400).json({ messgage: "Product not Found" });
  }
};
