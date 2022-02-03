const express = require('express');
const storeAdd = require('../Controllers/store/storeAdd');
const storeCheck = require('../Middleware/storeCheck');
const router = express.Router();

router.post('/add',storeCheck,storeAdd);

module.exports = router;