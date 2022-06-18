const express = require("express");
const CustomerAdd = require("../Controllers/storeCustomer/customerAdd");
const CustomerGet = require("../Controllers/storeCustomer/customerGet");
const TokenVerify = require("../Middleware/TokenVerify");
const router = express.Router();

// Add a customer
router.post("/add", TokenVerify, CustomerAdd);
// All customer get
router.get("/get", TokenVerify, CustomerGet);

module.exports = router;
