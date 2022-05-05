const express = require("express");

router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send({ message: "hello" });
});

module.exports = router;
