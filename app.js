// importing packages
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();

// Import helper functions
const ErrorFunction = require("./Helpers/ErrorFunction");
const SendResponse = require("./Helpers/SendResponse");

// Import routers
const userRoutes = require("./Routes/userRoutes");
const storeRoutes = require("./Routes/storeRoutes");
const medicineRoutes = require("./Routes/medicineRoutes");

// Application configuration setup
app.use(cookieParser());
// app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// Api request handling
app.get("/", async (req, res) => {
  console.log(req.cookies);
  res.send(SendResponse(true, "Api is working fine"));
});

// User routes
app.use("/api/v1/user", userRoutes);

// Store routes
app.use("/api/v1/store", storeRoutes);

// Store routes
app.use("/api/v1/medicine", medicineRoutes);

// Error handling
app.use(ErrorFunction);
// Handle undefined routes
app.use("*", (req, res, next) => {
  res.status(404).send(SendResponse(false, "Undefined route"));
});

module.exports = app;
