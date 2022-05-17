const express = require("express");

const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/posts", require("./posts"));
router.use("/comments", require("./comments"));
router.use("/user", require("./user"));

module.exports = router;
