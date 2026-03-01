import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ChartData } from '../types';

// 注册 Chart.js 组件
ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: ChartData;
  title?: string;
}

const PieChart: React.FC<PieChartProps> = ({ data, title }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
      },
      title: {
        display: !!title,
        text: title,
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
