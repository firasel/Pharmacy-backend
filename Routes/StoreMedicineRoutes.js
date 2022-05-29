const express = require("express");
const MedicineAdd = require("../Controllers/storeProduct/MedicineAdd");
const MedicineAllAdd = require("../Controllers/StoreProduct/MedicineAllAdd");
const MedicineDelete = require("../Controllers/storeProduct/MedicineDelete");
const MedicineGet = require("../Controllers/StoreProduct/MedicineGet");
const MedicineUpdate = require("../Controllers/StoreProduct/MedicineUpdate");
const TokenVerify = require("../Middleware/TokenVerify");
const router = express.Router();

// Medicine add
router.post("/add", TokenVerify, MedicineAdd);

// Medicine add
router.post("/add/all", TokenVerify, MedicineAllAdd);

// Medicine update
router.put("/update", TokenVerify, MedicineUpdate);

// Medicine get
router.get("/get", TokenVerify, MedicineGet);

// Medicine get
router.delete("/delete/:id", TokenVerify, MedicineDelete);

module.exports = router;
