const express = require("express");
const medicineAdd = require("../Controllers/publicProduct/publicMedicineAdd");
const medicineAllDataAdd = require("../Controllers/publicProduct/medicineAllDataAdd");
const tokenVerify = require("../Middleware/tokenVerify");
const router = express.Router();

// Medicine add
router.post("/add", tokenVerify, medicineAdd);
// All medicine add
router.post("/Add/all", medicineAllDataAdd);

module.exports = router;
