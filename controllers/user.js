const { Post } = require("../models/postModel");
const { User } = require("../models/userModel");

const getUserById = async (req, res) => {
  const { username } = req.params;
  try {
    const response = await User.findOne({ username }).populate([
      "followers",
      "following",
    ]);
    const user = response._doc;
    delete user.password;
    res.status(200).json({ ...user });
  } catch (error) {
    console.log(error);
  }
};

const getPostByUserId = async (req, res) => {
  const { user_id } = req.params;
  try {
    const posts = await Post.find({ author: user_id });
    const populatedPost = await Post.populate(posts, [
      "author",
      { path: "comments", populate: "author" },
    ]);
    res.status(200).send(populatedPost);
  } catch (error) {
    console.log(error);
  }
};

const getFollowers = async (req, res) => {
  const { user_id } = req.params;
  const user = await User.findById(user_id).populate("followers");
  res.status(200).send(user.followers);
};

module.exports = { getUserById, getPostByUserId, getFollowers };
