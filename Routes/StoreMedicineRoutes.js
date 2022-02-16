const express = require("express");
const MedicineAdd = require("../Controllers/storeProduct/MedicineAdd");
const TokenVerify = require("../Middleware/TokenVerify");
const router = express.Router();

// Medicine add
router.post("/add", TokenVerify, MedicineAdd);

module.exports = router;
