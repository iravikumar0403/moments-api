const express = require("express");
const {
  getUserById,
  getPostByUserId,
  getFollowers,
} = require("../controllers/user");
const { verifyAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/:username", verifyAuth, getUserById);
router.get("/posts/:user_id", verifyAuth, getPostByUserId);
router.get("/followers/:user_id", verifyAuth, getFollowers);

module.exports = router;
