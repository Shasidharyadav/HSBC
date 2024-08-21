const express = require('express');
const { getCustomerData } = require('../controllers/customerController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Route to get customer data with authentication
router.get('/data', authMiddleware, roleMiddleware('customer'), getCustomerData);

module.exports = router;
