const express = require('express');
const signup = require('../Controllers/user/signup');
const router = express.Router();

router.post('/signup',signup);

module.exports = router;