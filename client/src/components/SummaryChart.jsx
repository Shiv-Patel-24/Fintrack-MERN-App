import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function SummaryChart({ totalIncome = 0, totalExpense = 0 }) {
  const data = {
    labels: ['Total Income', 'Total Expenses'],
    datasets: [
      {
        label: 'Amount (₹)',
        data: [totalIncome, totalExpense], 
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };
  
  if (totalIncome === 0 && totalExpense === 0) {
    return <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No data for this period.</p>;
  }

  return <Pie data={data} options={options} />;
}

export default SummaryChart;