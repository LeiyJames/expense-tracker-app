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
} from 'chart.js';
import { motion } from 'framer-motion';
import { Line, Pie } from 'react-chartjs-2';
import { chartData } from '../../data/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

export default function Charts() {
  const pieOptions = {
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
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#3b82f6',
        borderWidth: 1,
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
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Spending by Category
        </h3>
        <div className="h-80">
          <Pie data={chartData.pieChart} options={pieOptions} />
        </div>
      </motion.div>

      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Monthly Spending Trend
        </h3>
        <div className="h-80">
          <Line data={chartData.monthlyChart} options={lineOptions} />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="card p-6 lg:col-span-2"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Budget Goal Tracking
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-200 dark:text-gray-700"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                />
                <motion.path
                  className="text-success-500"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  strokeDasharray="67, 100"
                  strokeLinecap="round"
                  d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                  initial={{ strokeDasharray: "0, 100" }}
                  animate={{ strokeDasharray: "67, 100" }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">67%</span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Budget Used</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">$2,847 / $4,500</p>
          </div>

          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 rounded-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">$1,653</p>
                <p className="text-sm text-primary-600 dark:text-primary-400">Remaining</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Available Budget</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">33% left for this month</p>
          </div>

          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-danger-100 to-danger-200 dark:from-danger-900 dark:to-danger-800 rounded-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-danger-600 dark:text-danger-400">9</p>
                <p className="text-sm text-danger-600 dark:text-danger-400">Days</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Until Month End</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">$183.67 daily budget left</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
