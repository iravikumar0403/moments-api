const express = require("express");
const { addComment, likeComment } = require("../controllers/comments");
const { verifyAuth } = require("../middleware/auth");
const router = express.Router();

router.post("/:post_id", verifyAuth, addComment);
router.post("/like/:comment_id", verifyAuth, likeComment);
router.post("/reply/:comment_id");

module.exports = router;
