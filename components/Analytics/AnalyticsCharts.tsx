'use client';

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  ArcElement,
  BarElement,
} from 'chart.js';
import { motion } from 'framer-motion';
import { Line, Pie, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

export default function AnalyticsCharts() {
  // Pie Chart Data
  const pieData = {
    labels: ['Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 'Utilities', 'Health & Fitness'],
    datasets: [{
      data: [240.53, 89.70, 289.98, 39.99, 169.44, 83.79],
      backgroundColor: [
        '#3b82f6',
        '#10b981',
        '#8b5cf6',
        '#f59e0b',
        '#ef4444',
        '#06b6d4',
      ],
      borderWidth: 0,
    }],
  };

  // Line Chart Data
  const lineData = {
    labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
    datasets: [{
      label: 'Monthly Expenses',
      data: [2100, 2850, 2200, 3100, 2847],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      fill: true,
    }],
  };

  // Bar Chart Data
  const barData = {
    labels: ['Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 'Utilities', 'Health & Fitness'],
    datasets: [{
      label: 'Amount Spent',
      data: [240.53, 89.70, 289.98, 39.99, 169.44, 83.79],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(6, 182, 212, 0.8)',
      ],
      borderColor: [
        '#3b82f6',
        '#10b981',
        '#8b5cf6',
        '#f59e0b',
        '#ef4444',
        '#06b6d4',
      ],
      borderWidth: 1,
    }],
  };

  // Donut Chart Data for Budget Progress
  const donutData = {
    labels: ['Used Budget', 'Remaining Budget'],
    datasets: [{
      data: [2847, 1653],
      backgroundColor: ['#ef4444', '#10b981'],
      borderWidth: 0,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          color: '#374151',
        },
      },
    },
  };

  const lineOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
        },
      },
      y: {
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
        ticks: {
          color: '#6b7280',
          callback: function(value: any) {
            return '$' + value;
          },
        },
      },
    },
  };

  const barOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
        },
      },
      y: {
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
        ticks: {
          color: '#6b7280',
          callback: function(value: any) {
            return '$' + value;
          },
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Pie Chart */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Category Breakdown
        </h3>
        <div className="h-80">
          <Pie data={pieData} options={chartOptions} />
        </div>
      </motion.div>

      {/* Line Chart */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Monthly Trends
        </h3>
        <div className="h-80">
          <Line data={lineData} options={lineOptions} />
        </div>
      </motion.div>

      {/* Bar Chart */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Category Comparison
        </h3>
        <div className="h-80">
          <Bar data={barData} options={barOptions} />
        </div>
      </motion.div>

      {/* Donut Chart */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Budget Progress
        </h3>
        <div className="h-80 relative">
          <Doughnut data={donutData} options={chartOptions} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">67%</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Used</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
