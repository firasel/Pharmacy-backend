const express = require("express");
const Signin = require("../Controllers/User/Signin");
const Signup = require("../Controllers/User/Signup");
const VerifyToken = require("../Controllers/User/VerifyToken");
const router = express.Router();

// Signup
router.post("/signup", Signup);
// Signin
router.post("/signin", Signin);
// Verify user signin
router.get("/verify", VerifyToken);

module.exports = router;
