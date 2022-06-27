const express = require("express");
const productSellAdd = require("../Controllers/productSell/productSellAdd");
const productSellGet = require("../Controllers/productSell/productSellGet");
const productSellUpdate = require("../Controllers/productSell/productSellUpdate");
const TokenVerify = require("../Middleware/TokenVerify");
const router = express.Router();

// Add a sell history
router.post("/add", TokenVerify, productSellAdd);
// Get sell history
router.get("/get", TokenVerify, productSellGet);
// Update sell history
router.put("/update", TokenVerify, productSellUpdate);

module.exports = router;
