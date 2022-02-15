const express = require("express");
const medicineAdd = require("../Controllers/product/medicineAdd");
const medicineAllDataAdd = require("../Controllers/product/medicineAllDataAdd");
const tokenVerify = require("../Middleware/tokenVerify");
const router = express.Router();

// Medicine add
router.post("/add", tokenVerify, medicineAdd);
// All medicine add
router.post("/Add/all", medicineAllDataAdd);

module.exports = router;
