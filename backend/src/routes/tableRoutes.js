const express = require('express');
const router = express.Router();
const { createTable, getTables} = require('../controllers/tableController');

//middleware
const { protect, authorize } = require('../middleware/authMiddleware');

//create a table
router.post('/create-table', protect, authorize("admin"), createTable);

//get all tables
router.get('/table', protect, authorize("admin", "waiter", "reception"), getTables);

module.exports = router;