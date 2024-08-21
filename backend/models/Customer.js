const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  customerID: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  zipcodeOri: { type: String, required: true },
});

module.exports = mongoose.model('Customer', customerSchema);
