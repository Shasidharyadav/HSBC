import React from 'react';
import { Bar } from 'react-chartjs-2';

const ChartComponent = ({ data, title }) => {
  const chartData = {
    labels: data.map(transaction => transaction.category),  // Assuming transactions have a 'category' field
    datasets: [
      {
        label: 'Transaction Amounts',
        data: data.map(transaction => transaction.amount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};


export default ChartComponent;
