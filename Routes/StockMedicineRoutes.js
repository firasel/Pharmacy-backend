const express = require("express");
const StockMedicineAdd = require("../Controllers/StockProduct/StockMedicineAdd");
const StockMedicineUpdate = require("../Controllers/StockProduct/StockMedicineUpdate");
const TokenVerify = require("../Middleware/TokenVerify");
const router = express.Router();

// Medicine stock add
router.post("/add", TokenVerify, StockMedicineAdd);

// Medicine stock(only) update
router.post("/update", TokenVerify, StockMedicineUpdate);

module.exports = router;
