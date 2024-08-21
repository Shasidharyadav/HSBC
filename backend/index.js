const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const merchantRoutes = require('./routes/merchantRoutes');
const adminRoutes = require('./routes/adminRoutes');  // Include adminRoutes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB Connected...');
}).catch((err) => console.log(err));

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/merchant', merchantRoutes);
app.use('/api/admin', adminRoutes);  // Register admin routes

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
