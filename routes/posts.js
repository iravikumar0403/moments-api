const express = require("express");
const {
  getAllPosts,
  getFollowingPost,
  addPosts,
} = require("../controllers/posts");
const { verifyAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", verifyAuth, getAllPosts);
router.post("/", verifyAuth, addPosts);
router.get("/feed", verifyAuth, getFollowingPost);

module.exports = router;
