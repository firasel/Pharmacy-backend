const express = require("express");
const MedicineAdd = require("../Controllers/storeProduct/medicineAdd");
const MedicineAllAdd = require("../Controllers/storeProduct/medicineAllAdd");
const MedicineDelete = require("../Controllers/storeProduct/medicineDelete");
const MedicineGet = require("../Controllers/storeProduct/medicineGet");
const MedicineUpdate = require("../Controllers/storeProduct/medicineUpdate");
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
