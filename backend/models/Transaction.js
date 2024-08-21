const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  step: { type: Number, required: true },
  customerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  merchantID: { type: mongoose.Schema.Types.ObjectId, ref: 'Merchant', required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  fraud: { type: Number, required: true },
});

module.exports = mongoose.model('Transaction', transactionSchema);
