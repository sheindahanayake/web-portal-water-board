  import React from 'react';
  import { Pie } from 'react-chartjs-2';
  import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
  } from 'chart.js';

  // Register the required components
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
  );

  const PieChart = ({ data }) => {
    if (!data || !data.labels || !data.values) {
      return <p>No data available</p>;
    }

    const chartData = {
      labels: data.labels,
      datasets: [
        {
          label: data.label,
          data: data.values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    return (
      <div>
        <h2 className="text-lg font-semibold mb-4">{data.title}</h2>
        <Pie data={chartData} />
      </div>
    );
  };

  export default PieChart;