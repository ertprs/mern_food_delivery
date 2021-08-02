const User = require("../model/auth.model");

exports.updateHomeAddress = async (req, res) => {
  await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: {
        "homeAddress.flatno": req.body.homeAddress.flatno,
        "homeAddress.area": req.body.homeAddress.area,
        "homeAddress.landmark": req.body.homeAddress.landmark,
        "homeAddress.address": req.body.homeAddress.address,
        "homeAddress.latitude": req.body.homeAddress.latitude,
        "homeAddress.longitude": req.body.homeAddress.longitude,
      },
    },
    { new: true }
  ).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    res.status(200).json({ user });
  });
};

exports.updateWorkAddress = async (req, res) => {
  await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: {
        "workAddress.flatno": req.body.workAddress.flatno,
        "workAddress.area": req.body.workAddress.area,
        "workAddress.landmark": req.body.workAddress.landmark,
        "workAddress.address": req.body.workAddress.address,
        "workAddress.latitude": req.body.workAddress.latitude,
        "workAddress.longitude": req.body.workAddress.longitude,
      },
    },
    { new: true }
  ).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    res.status(200).json({ user });
  });
};

exports.getUserData = async (req, res) => {
  try {
    await User.findOne({ _id: req.user._id }, (err, user) => {
      if (err) return res.status(400).json({ error });

      if (!user) return res.status(400).json({ error: "User dosnt exist" });

      res.status(200).json({ user });
    }).select("-password, -email");
  } catch (error) {
    res.status(400).json({ error });
  }
};
