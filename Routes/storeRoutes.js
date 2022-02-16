const express = require('express');
const StoreAdd = require('../Controllers/Store/StoreAdd');
const StoreCheck = require('../Middleware/StoreCheck');
const router = express.Router();

router.post('/add',StoreCheck,StoreAdd);

module.exports = router;