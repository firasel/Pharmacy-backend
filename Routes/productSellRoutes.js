const express = require("express");
const productSellAdd = require("../Controllers/productSell/productSellAdd");
const TokenVerify = require("../Middleware/TokenVerify");
const router = express.Router();

// Add a sell history
router.post("/add", TokenVerify, productSellAdd);

module.exports = router;
