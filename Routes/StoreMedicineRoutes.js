const express = require("express");
const MedicineAdd = require("../Controllers/storeProduct/MedicineAdd");
const MedicineUpdate = require("../Controllers/StoreProduct/MedicineUpdate");
const TokenVerify = require("../Middleware/TokenVerify");
const router = express.Router();

// Medicine add
router.post("/add", TokenVerify, MedicineAdd);

// Medicine update
router.post("/update", TokenVerify, MedicineUpdate);

module.exports = router;
