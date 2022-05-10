const { Post } = require("../models/postModel");
const { User } = require("../models/userModel");
const path = require("path");

const getAllPosts = async (req, res) => {
  const allPosts = await Post.find({})
    .sort("-updatedAt")
    .populate({
      path: "author",
      select: ["avatar", "firstname", "lastname", "_id"],
    });
  res.send(allPosts);
};

const getFollowingPost = async (req, res) => {
  const post = await Post.find({});
  /**
   * TO-DO
   * get userid from req body
   * find user and extract following id
   * find post by "following" users
   * return post
   */
  res.send(post);
};

const addPosts = async (req, res) => {
  const newPost = new Post({
    ...req.body,
    author: { _id: req.body.user_id },
  });

  const createdPost = await newPost.save();
  const data = await Post.populate(createdPost, {
    path: "author",
    select: ["avatar", "firstname", "lastname", "_id"],
  });

  res.status(201).json(data);
};

const editPosts = async (req, res) => {
  const { post_id } = req.params;
  const updatedPost = await Post.findByIdAndUpdate(
    post_id,
    { content: req.body.content, isEdited: true },
    { returnOriginal: false }
  );
  const data = await Post.populate(updatedPost, {
    path: "author",
    select: ["avatar", "firstname", "lastname", "_id"],
  });
  res.status(200).json(updatedPost);
};

const deletePosts = async (req, res) => {
  const { post_id } = req.params;
  const { user_id } = req.body;
  await Post.findOneAndDelete({
    _id: post_id,
    author: user_id,
  });
  res.status(204).send();
};

const likePost = async (req, res) => {
  const { post_id } = req.params;
  const { user_id } = req.body;
  const post = await Post.findById(post_id);
  let updatedPost;
  if (post.likes.includes(user_id)) {
    updatedPost = await Post.findByIdAndUpdate(
      {
        _id: post_id,
      },
      {
        $pullAll: { likes: [user_id] },
      },
      {
        returnOriginal: false,
      }
    );
  } else {
    updatedPost = await Post.findByIdAndUpdate(
      {
        _id: post_id,
      },
      {
        $addToSet: { likes: [user_id] },
      },
      {
        returnOriginal: false,
      }
    );
  }
  const data = await Post.populate(updatedPost, {
    path: "author",
    select: ["avatar", "firstname", "lastname", "_id"],
  });
  res.send(data);
};

const savePost = async (req, res) => {
  const { post_id } = req.params;
  const { user_id } = req.body;
  const user = await User.findById(user_id);
  let updatedUser;
  if (user.saved.includes(post_id)) {
    updatedUser = await User.findByIdAndUpdate(
      {
        _id: user_id,
      },
      {
        $pullAll: { saved: [post_id] },
      },
      {
        returnOriginal: false,
      }
    );
  } else {
    updatedUser = await User.findByIdAndUpdate(
      {
        _id: user_id,
      },
      {
        $addToSet: { saved: [post_id] },
      },
      {
        returnOriginal: false,
      }
    );
  }
  res.status(200).send(updatedUser);
};

const getBookmarks = async (req, res) => {
  const { user_id } = req.body;
  const user = await User.findById(user_id).populate({
    path: "saved",
    populate: {
      path: "author",
    },
  });
  res.status(200).json(user.saved);
};

module.exports = {
  getAllPosts,
  addPosts,
  getFollowingPost,
  editPosts,
  deletePosts,
  likePost,
  savePost,
  getBookmarks,
};
