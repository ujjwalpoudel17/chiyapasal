const express = require('express');
const router = express.Router();

const { createOrder, getOrders, finalizePayment } = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { verify } = require('jsonwebtoken');

//waiter create order
router.post('/create', protect, authorize("waiter"), createOrder);

//receptionist view all orders
router.get('/', protect, authorize("reception"), getOrders);

router.patch('/:orderId/pay', finalizePayment);





module.exports = router;