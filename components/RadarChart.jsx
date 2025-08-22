// RadarChart.js
import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function RadarChart({ metrics }) {
  const labels = ['Performance', 'Security', 'SEO'];
  const dataValues = [
    metrics.performance || 0,
    metrics.security || 0,
    metrics.seo || 0,
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Metrics',
        data: dataValues,
        backgroundColor: 'rgba(34, 132, 209, 0.2)',
        borderColor: 'rgba(34, 132, 209, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(34, 132, 209, 1)',
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 10,
        ticks: {
          display: false // hides the axis tick numbers
        },
        pointLabels: {
          font: {
            size: 14
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    }
  };

  return <Radar data={data} options={options} />;
}
