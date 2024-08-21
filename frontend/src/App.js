import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import MerchantDashboard from './components/MerchantDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/merchant-dashboard" element={<MerchantDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
