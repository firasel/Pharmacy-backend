const express = require("express");
const signin = require("../Controllers/user/signin");
const signup = require("../Controllers/user/signup");
const router = express.Router();

// Signup
router.post("/signup", signup);
// Signin
router.post("/signin", signin);

module.exports = router;
