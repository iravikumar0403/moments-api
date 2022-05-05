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
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(201).send({
      user: { ...savedUser, token },
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
      message: "Bad request",
    });
    return;
  }

  const { _doc: existingUser } = await User.findOne({ email });

  if (!existingUser) {
    res.status(404).send({
      message: "User does not exists",
    });
    return;
  }

  const isPassCorrect = await bcrypt.compareSync(
    password,
    existingUser.password
  );
  if (isPassCorrect) {
    delete existingUser.password;
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(201).send({
      user: { ...existingUser, token },
    });
  }
};

module.exports = {
  registerController,
  loginController,
};
