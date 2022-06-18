const express = require("express");
const CustomerAdd = require("../Controllers/storeCustomer/customerAdd");
const CustomerDelete = require("../Controllers/storeCustomer/customerDelete");
const CustomerGet = require("../Controllers/storeCustomer/customerGet");
const CustomerUpdate = require("../Controllers/storeCustomer/customerUpdate");
const TokenVerify = require("../Middleware/TokenVerify");
const router = express.Router();

// Add a customer
router.post("/add", TokenVerify, CustomerAdd);
// One customer details update
router.put("/update", TokenVerify, CustomerUpdate);
// All customer get
router.get("/get", TokenVerify, CustomerGet);
// One customer delete
router.delete("/delete/:id", TokenVerify, CustomerDelete);

module.exports = router;
