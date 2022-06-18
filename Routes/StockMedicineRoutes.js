const express = require("express");
const StockDetailsUpdate = require("../Controllers/stockProduct/stockDetailsUpdate");
const StockMedicineAdd = require("../Controllers/stockProduct/stockMedicineAdd");
const StockMedicineCount = require("../Controllers/stockProduct/stockMedicineCount");
const StockMedicineGet = require("../Controllers/stockProduct/stockMedicineGet");
const StockMedicineUpdate = require("../Controllers/stockProduct/stockMedicineUpdate");
const TokenVerify = require("../Middleware/TokenVerify");
const router = express.Router();

// Medicine stock add
router.post("/add", TokenVerify, StockMedicineAdd);

// Medicine stock(only) update
router.put("/update/stock", TokenVerify, StockMedicineUpdate);

// Medicine stock details update
router.put("/update/details", TokenVerify, StockDetailsUpdate);

// Medicine stock get
router.get("/get", TokenVerify, StockMedicineGet);

// Medicine stock count
router.get("/count", TokenVerify, StockMedicineCount);

module.exports = router;
