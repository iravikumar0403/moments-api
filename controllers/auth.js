const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).send({
      message: "User already exists",
    });
    return;
  }
  const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
  const hash = bcrypt.hashSync(password, salt);
  const newUser = new User({
    ...req.body,
    password: hash,
  });

  try {
    const { _doc: savedUser } = await newUser.save();
    delete savedUser.password;
    const token = jwt.sign(
      { user_id: existingUser._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.status(201).send({
      ...savedUser,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      message: "Invalid credentials",
    });
    return;
  }

  const data = await User.findOne({ email });

  if (!data) {
    res.status(400).send({
      message: "User does not exists",
    });
    return;
  }

  const existingUser = data._doc;
  const isPwdCorrect = bcrypt.compareSync(password, existingUser.password);
  if (isPwdCorrect) {
    delete existingUser.password;
    const token = jwt.sign(
      { user_id: existingUser._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).send({
      ...existingUser,
      token,
    });
  } else {
    res.status(400).json({
      message: "Invalid crendentials",
    });
  }
};

module.exports = {
  registerController,
  loginController,
};
