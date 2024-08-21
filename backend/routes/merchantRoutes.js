const express = require('express');
const {
  getMerchantData,    // Ensure this is correctly imported from the controller
  createMerchant,     // Ensure this is correctly imported from the controller
  updateMerchant,     // Ensure this is correctly imported from the controller
  deleteMerchant      // Ensure this is correctly imported from the controller
} = require('../controllers/merchantController');  // Correct path to the controller

const router = express.Router();

// Route to get all merchants
router.get('/merchants', getMerchantData);

// Route to create a new merchant
router.post('/merchants', createMerchant);  // This line is causing the issue

// Route to update a merchant
router.put('/merchants/:id', updateMerchant);

// Route to delete a merchant
router.delete('/merchants/:id', deleteMerchant);

module.exports = router;
