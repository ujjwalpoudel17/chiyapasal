const express = require('express');
const router = express.Router();
const { registerStaff, login, getProfile, getWaiters } = require('../controllers/authController');

//middleware
const { protect, authorize } = require('../middleware/authMiddleware');


//login route for all roles
router.post('/login', login);

//admin to create staff
router.post('/create-staff', protect, authorize("admin"), registerStaff);

//get waiters
router.get('/waiters', protect, authorize("admin"), getWaiters);

//get logged user profile
router.get('/me',protect, getProfile);

module.exports = router;