const Customer = require('../models/Customer');

exports.getCustomerData = async (req, res) => {
  try {
    const customerID = req.user.userID;  // Assuming the customer ID is stored in the JWT
    const customer = await Customer.findOne({ customerID }).populate('transactions');
    
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
