const express = require("express");
const signin = require("../Controllers/user/signin");
const signup = require("../Controllers/user/signup");
const verifyToken = require("../Controllers/user/verifyToken");
const router = express.Router();

// Signup
router.post("/signup", signup);
// Signin
router.post("/signin", signin);
// Verify user signin
router.get("/verify", verifyToken);

module.exports = router;
