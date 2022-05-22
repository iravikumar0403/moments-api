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
    const posts = await Post.find({ author: user_id }).sort("-createdAt");
    const populatedPost = await Post.populate(posts, [
      "author",
      { path: "comments", populate: "author" },
    ]);
    res.status(200).send(populatedPost);
  } catch (error) {
    console.log(error);
  }
};

const followUser = async (req, res) => {
  const { user_id, user_to_follow } = req.body;
  if (user_id === user_to_follow) {
    res.status(400).send({
      message: "You can't follow yourself",
    });
    return;
  }
  const loggedInUser = await User.findByIdAndUpdate(
    user_id,
    {
      $addToSet: { following: user_to_follow },
    },
    {
      returnOriginal: false,
    }
  );
  const followedUser = await User.findByIdAndUpdate(
    user_to_follow,
    {
      $push: { followers: user_id },
    },
    {
      returnOriginal: false,
    }
  ).populate(["followers", "following"]);
  res.status(200).send(followedUser);
};

const unfollowUser = async (req, res) => {
  const { user_id, user_to_unfollow } = req.body;
  if (user_id === user_to_unfollow) {
    res.status(400).send({
      message: "You can't unfollow yourself",
    });
    return;
  }
  const loggedInUser = await User.findByIdAndUpdate(
    user_id,
    {
      $pullAll: { following: [user_to_unfollow] },
    },
    {
      returnOriginal: false,
    }
  );
  const unfollowedUser = await User.findByIdAndUpdate(
    user_to_unfollow,
    {
      $pullAll: { followers: [user_id] },
    },
    {
      returnOriginal: false,
    }
  );
  res.status(200).send(unfollowedUser);
};

const searchUser = async (req, res) => {
  const { query } = req.params;
  console.log(query);
  const result = await User.find({
    $or: [
      { username: new RegExp(query, "i") },
      { firstname: new RegExp(query, "i") },
      { lastname: new RegExp(query, "i") },
    ],
  });
  res.status(200).json(result);
};

const getSuggestions = async (req, res) => {
  const { user_id } = req.body;

  const user = await User.findById(user_id);

  // to-do:write algo to find indirect connections
  const suggestions = await User.find({
    _id: { $nin: [...user.following, user_id] },
  }).limit(5);

  res.status(200).json(suggestions);
};

const updateProfile = async (req, res) => {
  const { user_id } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      user_id,
      { ...req.body },
      { returnOriginal: false }
    ).populate(["followers", "following"]);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

module.exports = {
  getUserById,
  getPostByUserId,
  followUser,
  unfollowUser,
  searchUser,
  getSuggestions,
  updateProfile,
};
