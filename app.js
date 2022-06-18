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
const UserRoutes = require("./Routes/userRoutes");
const StoreRoutes = require("./Routes/storeRoutes");
const PublicMedicineRoutes = require("./Routes/publicMedicineRoutes");
const StoreMedicineRoutes = require("./Routes/storeMedicineRoutes");
const StockMedicineRoutes = require("./Routes/stockMedicineRoutes");
const StoreCustomerRoutes = require("./Routes/storeCustomerRoutes");

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
app.use("/api/v1/user", UserRoutes);

// Store routes
app.use("/api/v1/store", StoreRoutes);

// Public product routes
app.use("/api/v1/medicine", PublicMedicineRoutes);

// Store product routes
app.use("/api/v1/store/medicine", StoreMedicineRoutes);

// Store product routes
app.use("/api/v1/store/medicine/stock", StockMedicineRoutes);

// Store product routes
app.use("/api/v1/store/customer", StoreCustomerRoutes);

// Error handling
app.use(ErrorFunction);
// Handle undefined routes
app.use("*", (req, res, next) => {
  res.status(404).send(SendResponse(false, "Undefined route"));
});

module.exports = app;
