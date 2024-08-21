// merchantController.js

exports.getMerchantData = (req, res) => {
    // Fetch merchant data logic
    res.json({ message: 'Merchant data fetched successfully' });
  };
  
  exports.createMerchant = (req, res) => {
    // Logic to create a merchant
    const newMerchant = req.body;
    res.json({ message: 'Merchant created successfully', data: newMerchant });
  };
  
  exports.updateMerchant = (req, res) => {
    // Logic to update a merchant by id
    const { id } = req.params;
    res.json({ message: `Merchant with id ${id} updated successfully` });
  };
  
  exports.deleteMerchant = (req, res) => {
    // Logic to delete a merchant by id
    const { id } = req.params;
    res.json({ message: `Merchant with id ${id} deleted successfully` });
  };
  