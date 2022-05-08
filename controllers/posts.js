const { Post } = require("../models/postModel");
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

module.exports = { getAllPosts, addPosts, getFollowingPost };
