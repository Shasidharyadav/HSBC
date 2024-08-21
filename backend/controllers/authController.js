const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
const Merchant = require('../models/Merchant');

exports.login = async (req, res) => {
  const { id, password } = req.body;

  if (id === 'admin' && password === 'admin') {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token, role: 'admin' });
  }

  let user = await Customer.findOne({ customerID: id });
  if (user && password === 'shashi') {
    const token = jwt.sign({ role: 'customer', id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token, role: 'customer' });
  }

  user = await Merchant.findOne({ merchantID: id });
  if (user && password === 'hsbc') {
    const token = jwt.sign({ role: 'merchant', id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token, role: 'merchant' });
  }

  return res.status(400).json({ error: 'Invalid credentials' });
};
