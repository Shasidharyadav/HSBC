const Customer = require('../models/Customer');
const Merchant = require('../models/Merchant');

exports.getAllData = async (req, res) => {
  try {
    const customers = await Customer.find().populate('transactions');
    const merchants = await Merchant.find().populate('transactions');
    res.json({ customers, merchants });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
