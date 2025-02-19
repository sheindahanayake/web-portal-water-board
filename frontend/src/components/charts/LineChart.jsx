import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the required components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data, options }) => {
  if (!data || !data.labels || !data.datasets) {
    return <p>No data available</p>;
  }

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;