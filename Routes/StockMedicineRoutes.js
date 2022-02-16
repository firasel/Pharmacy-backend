const express = require("express");
const StockMedicineAdd = require("../Controllers/StockProduct/StockMedicineAdd");
const TokenVerify = require("../Middleware/TokenVerify");
const router = express.Router();

// Medicine stock add
router.post("/add", TokenVerify, StockMedicineAdd);

module.exports = router;
