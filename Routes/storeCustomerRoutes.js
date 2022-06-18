const express = require('express');
const TokenVerify = require('../Middleware/TokenVerify');
const router = express.Router();

router.post('/add',TokenVerify);

module.exports = router;