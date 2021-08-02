const User = require("../model/auth.model");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "255334458330-t1u9bqra92q352v3uhaiopt6atiq7sv6.apps.googleusercontent.com"
);

//register validation
const registerSchemaValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(15).required(),
});

//login validation
const loginSchemaValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(4).max(12).required(),
});

exports.googleLogin = (req, res) => {
  const { tokenId } = req.body;

  client
    .verifyIdToken({
      idToken: tokenId,
      audience:
        "255334458330-t1u9bqra92q352v3uhaiopt6atiq7sv6.apps.googleusercontent.com",
    })
    .then((response) => {
      const { email_verified, name, email } = response.payload;
      //   res.status(200).json({ response: response.payload });
      if (email_verified) {
        User.findOne({ email: email }, (err, user) => {
          if (err) {
            res.status(400).json({ error: "something went wrong..." });
          } else {
            if (user) {
              const token = jwt.sign(
                { _id: user._id },
                process.env.JWT_ACCESS_TOKEN,
                { expiresIn: "7d" }
              );
              const { _id, name, email } = user;

              res.status(200).json({ token, user: { _id, name, email } });
            } else {
              let password = email + process.env.JWT_ACCESS_TOKEN;
              let newUser = new User({ name, email, password });
              newUser.save((err, data) => {
                if (err)
                  return res
                    .status(400)
                    .json({ error: "something went wrong..." });

                const token = jwt.sign(
                  { _id: data._id },
                  process.env.JWT_ACCESS_TOKEN,
                  { expiresIn: "7d" }
                );

                const { _id, name, email } = newUser;

                res.status(200).json({ token, user: { _id, name, email } });
              });
            }
          }
        });
      }
    });
};

//register Controller
exports.register = async (req, res) => {
  const { error } = registerSchemaValidation.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists)
    return res.status(400).json({ error: "Email already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.status(201).json({ message: "New User Created" });
  } catch (error) {
    res.status(400).json({ error: "Cannot register try after somer time" });
  }
};

//login Controller
exports.login = async (req, res) => {
  const { error } = loginSchemaValidation.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: "Email Doesnt Exist" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: "Invalid Password" });

  const accessToken = jwt.sign(
    { id: user._id, name: user.name },
    process.env.JWT_ACCESS_TOKEN,
    {
      expiresIn: "7d",
    }
  );

  const { _id, name, email } = user;

  res.status(200).json({ token: accessToken, user: { _id, name, email } });
};
