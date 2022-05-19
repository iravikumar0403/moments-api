const express = require("express");
const {
  getUserById,
  getPostByUserId,
  followUser,
  unfollowUser,
  searchUser,
  getSuggestions,
  updateProfile,
} = require("../controllers/user");
const { verifyAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/suggestions", verifyAuth, getSuggestions);
router.get("/search/:query", verifyAuth, searchUser);
router.get("/:username", verifyAuth, getUserById);
router.get("/posts/:user_id", verifyAuth, getPostByUserId);
router.post("/update", verifyAuth, updateProfile);
router.post("/follow", verifyAuth, followUser);
router.post("/unfollow", verifyAuth, unfollowUser);

module.exports = router;
