// importing packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();

// Application configuration setup
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
const port = process.env.PORT || 3000;

// Api request handling
app.get("/", async (req, res) => {
  res.send("Api is working fine");
});

// Error handling
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send("Found an error from backend!");
  }
});

// Application running
app.listen(port, () => console.log("Server runing is port", port));
