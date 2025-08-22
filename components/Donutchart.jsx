import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const centerTextPlugin = {
  id: 'centerTextPlugin',
  beforeDraw(chart) {
    const { ctx, chartArea } = chart;
    if (!chartArea) return;

    const { left, top, width, height } = chartArea;
    const count = chart.data.labels.length;
    const text = count > 9 ? '9+' : String(count);

    ctx.save();
    ctx.font = 'bold 48px Arial';  // Increased font size from 36px to 48px
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, left + width / 2, top + height / 2);
    ctx.restore();
  },
};

const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 60%)`;
};

const DonutChart = ({ data }) => {
  const colorsMap = useMemo(() => {
    const map = {};
    data.forEach(item => {
      if (!map[item.id]) {
        map[item.id] = getRandomColor();
      }
    });
    return map;
  }, [data]);

  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: data.map(item => colorsMap[item.id]),
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '60%',
    plugins: {
      legend: { position: 'right' },
      tooltip: { enabled: true },
    },
  };

  return <Doughnut data={chartData} options={options} plugins={[centerTextPlugin]} />;
};

export default DonutChart;
