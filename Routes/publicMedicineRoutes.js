const express = require("express");
const MedicineAdd = require("../Controllers/PublicProduct/PublicMedicineAdd");
const MedicineAllDataAdd = require("../Controllers/PublicProduct/MedicineAllDataAdd");
const TokenVerify = require("../Middleware/TokenVerify");
const PublicMedicineGet = require("../Controllers/PublicProduct/PublicMedicineGet");
const router = express.Router();

// Medicine add in public collection
router.post("/add", TokenVerify, MedicineAdd);
// All medicine add in public collection
router.post("/Add/all", MedicineAllDataAdd);
// Medicine get
router.get("/get", PublicMedicineGet);

module.exports = router;
