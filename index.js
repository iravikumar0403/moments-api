const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => res.send("ping"));
app.use("/api", require("./routes"));

connectDB();
app.listen(process.env.PORT || 5000, () => {
  console.log("server is running");
});

module.exports = app;
