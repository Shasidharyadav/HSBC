import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ChartContainer = styled.div`
  margin: 20px auto;
  width: 60%;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const TransactionsList = styled.ul`
  margin-top: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const TransactionItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
`;

const MerchantDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [chartData, setChartData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAmountRange, setSelectedAmountRange] = useState('All');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/api/merchant/transactions', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setTransactions(response.data);
        setFilteredTransactions(response.data);
        updateChart(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    filterData(category, selectedAmountRange);
  };

  const handleAmountRangeChange = (e) => {
    const range = e.target.value;
    setSelectedAmountRange(range);
    filterData(selectedCategory, range);
  };

  const filterData = (category, amountRange) => {
    const filtered = transactions.filter((transaction) => {
      const matchesCategory = category === 'All' || transaction.category === category;
      const matchesAmountRange =
        amountRange === 'All' ||
        (amountRange === 'low' && transaction.amount < 50) ||
        (amountRange === 'mid' && transaction.amount >= 50 && transaction.amount <= 100) ||
        (amountRange === 'high' && transaction.amount > 100);

      return matchesCategory && matchesAmountRange;
    });

    setFilteredTransactions(filtered);
    updateChart(filtered);
  };

  const updateChart = (data) => {
    const categories = {};
    data.forEach((transaction) => {
      categories[transaction.category] = (categories[transaction.category] || 0) + transaction.amount;
    });

    const chartData = {
      labels: Object.keys(categories),
      datasets: [
        {
          label: 'Transaction Categories',
          data: Object.values(categories),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        },
      ],
    };
    setChartData(chartData);
  };

  return (
    <DashboardContainer>
      <h1>Merchant Dashboard</h1>

      <Filters>
        <div>
          <label htmlFor="categoryFilter">Filter by Category:</label>
          <select id="categoryFilter" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="All">All</option>
            <option value="es_food">Food</option>
            <option value="es_health">Health</option>
            <option value="es_transportation">Transportation</option>
            <option value="es_fashion">Fashion</option>
          </select>
        </div>

        <div>
          <label htmlFor="amountFilter">Filter by Amount:</label>
          <select
            id="amountFilter"
            value={selectedAmountRange}
            onChange={handleAmountRangeChange}
          >
            <option value="All">All</option>
            <option value="low">Below $50</option>
            <option value="mid">$50 to $100</option>
            <option value="high">Above $100</option>
          </select>
        </div>
      </Filters>

      <ChartContainer>
        <h3>Transactions by Category</h3>
        <Pie data={chartData} />
      </ChartContainer>

      <TransactionsList>
        <h3>Transaction List</h3>
        {filteredTransactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          filteredTransactions.map((transaction, index) => (
            <TransactionItem key={index}>
              <strong>Amount:</strong> ${transaction.amount} | 
              <strong> Category:</strong> {transaction.category}
            </TransactionItem>
          ))
        )}
      </TransactionsList>
    </DashboardContainer>
  );
};

export default MerchantDashboard;
