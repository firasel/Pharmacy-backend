const express = require("express");
const StockMedicineAdd = require("../Controllers/StockProduct/StockMedicineAdd");
const StockMedicineCount = require("../Controllers/StockProduct/StockMedicineCount");
const StockMedicineGet = require("../Controllers/StockProduct/StockMedicineGet");
const StockMedicineUpdate = require("../Controllers/StockProduct/StockMedicineUpdate");
const TokenVerify = require("../Middleware/TokenVerify");
const MedicinesStock = require("../Models/StoreProduct/MedicineStockModel");
const router = express.Router();

// Medicine stock add
router.post("/add", TokenVerify, StockMedicineAdd);

// Medicine stock(only) update
router.put("/update", TokenVerify, StockMedicineUpdate);

// Medicine stock get
router.get("/get", TokenVerify, StockMedicineGet);

// Medicine stock count
router.get("/count", TokenVerify, StockMedicineCount);

module.exports = router;
