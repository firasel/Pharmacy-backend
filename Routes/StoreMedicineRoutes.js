const express = require("express");
const MedicineAdd = require("../Controllers/storeProduct/MedicineAdd");
const MedicineGet = require("../Controllers/StoreProduct/MedicineGet");
const MedicineUpdate = require("../Controllers/StoreProduct/MedicineUpdate");
const TokenVerify = require("../Middleware/TokenVerify");
const router = express.Router();

// Medicine add
router.post("/add", TokenVerify, MedicineAdd);

// Medicine update
router.put("/update", TokenVerify, MedicineUpdate);

// Medicine get
router.get("/get", TokenVerify, MedicineGet);

module.exports = router;
