const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const Customer = require('./models/Customer');
const Merchant = require('./models/Merchant');
const Transaction = require('./models/Transaction');

// Helper function to strip single quotes from strings
const stripQuotes = (str) => {
  if (typeof str === 'string') {
    return str.replace(/^'+|'+$/g, ''); // Remove leading and trailing single quotes
  }
  return str;
};

// Function to parse and save data from the uploaded .xlsx file
const parseAndSaveXLSX = async (fileName) => {
  const filePath = path.join(__dirname, 'uploads', fileName);

  // Read the file
  const workbook = xlsx.readFile(filePath);

  // Assuming the data is in the first sheet
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Convert sheet to JSON format
  const jsonData = xlsx.utils.sheet_to_json(sheet);

  console.log('Parsed Data:', jsonData);  // Log the parsed data to verify it's correct

  // Process each row
  for (const entry of jsonData) {
    // Strip quotes from necessary fields
    const customerID = stripQuotes(entry.customer);
    const age = stripQuotes(entry.age);  // Age might be quoted, so we strip it
    const gender = stripQuotes(entry.gender);
    const zipcodeOri = stripQuotes(entry.zipcodeOri);
    const merchantID = stripQuotes(entry.merchant);
    const zipMerchant = stripQuotes(entry.zipMerchant);
    const category = stripQuotes(entry.category);
    const amount = entry.amount;
    const fraud = entry.fraud;

    try {
      // Log customer and merchant details before saving
      console.log(`Processing entry: Customer ${customerID}, Merchant ${merchantID}, Amount ${amount}, Category ${category}`);

      // Check if customer exists, if not create one
      let customerEntry = await Customer.findOne({ customerID });
      if (!customerEntry) {
        customerEntry = new Customer({ customerID, age: Number(age), gender, zipcodeOri });
        await customerEntry.save();
        console.log('New customer saved:', customerEntry);
      } else {
        console.log('Customer already exists:', customerEntry);
      }

      // Check if merchant exists, if not create one
      let merchantEntry = await Merchant.findOne({ merchantID });
      if (!merchantEntry) {
        merchantEntry = new Merchant({ merchantID, zipMerchant });
        await merchantEntry.save();
        console.log('New merchant saved:', merchantEntry);
      } else {
        console.log('Merchant already exists:', merchantEntry);
      }

      // Save transaction
      const transaction = new Transaction({
        step: entry.step,
        customerID: customerEntry._id,
        merchantID: merchantEntry._id,
        category,
        amount,
        fraud,
      });
      await transaction.save();
      console.log('Transaction saved:', transaction);

    } catch (error) {
      console.error(`Error saving data: ${error.message}`);
    }
  }

  console.log('Data successfully saved from .xlsx file.');
};

module.exports = parseAndSaveXLSX;
