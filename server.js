const express = require("express");
const connectDB = require("./config/db");
const app = express();

require("dotenv").config();

// middlewares
app.use(express.json());

// routes
app.use("/api", require("./routes"));

connectDB();
app.listen(5000, () => {
  console.log("server is running");
});
