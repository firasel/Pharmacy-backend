const express = require('express');
const storeAdd = require('../Controllers/store/storeAdd');
const router = express.Router();

router.post('/add',storeAdd);

module.exports = router;