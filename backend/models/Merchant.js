const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
  merchantID: { type: String, required: true, unique: true },
  zipMerchant: { type: String, required: true },
});

module.exports = mongoose.model('Merchant', merchantSchema);
