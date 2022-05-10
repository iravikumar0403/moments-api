const express = require("express");
const {
  getAllPosts,
  getFollowingPost,
  addPosts,
  editPosts,
  deletePosts,
} = require("../controllers/posts");
const { verifyAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", verifyAuth, getAllPosts);
router.post("/", verifyAuth, addPosts);
router.post("/:post_id", verifyAuth, editPosts);
router.delete("/:post_id", verifyAuth, deletePosts);
router.get("/feed", verifyAuth, getFollowingPost);

module.exports = router;
