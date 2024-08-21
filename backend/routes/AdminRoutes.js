exports.getAdminTransactions = async (req, res) => {
    try {
      // Replace with your logic to fetch transactions from DB
      const transactions = await Transaction.find();  // Assuming you have a Transaction model
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching transactions' });
    }
  };
  