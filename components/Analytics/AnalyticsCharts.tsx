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
import { useData } from '../../context/DataContext';
import { useMemo } from 'react';

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
  const { expenses, getBudgetProgress } = useData();

  const chartData = useMemo(() => {
    // Calculate category totals from real expense data
    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    const categories = Object.keys(categoryTotals);
    const amounts = Object.values(categoryTotals);
    
    const colors = [
      '#3b82f6',
      '#10b981', 
      '#8b5cf6',
      '#f59e0b',
      '#ef4444',
      '#06b6d4',
      '#8b5a3c',
      '#dc2626',
      '#059669',
      '#7c3aed'
    ];

    // Get last 5 months of data for trend chart
    const monthlyData = expenses.reduce((acc, expense) => {
      const monthKey = new Date(expense.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      acc[monthKey] = (acc[monthKey] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    const sortedMonths = Object.keys(monthlyData).sort((a, b) => {
      return new Date(`${a}-01`).getTime() - new Date(`${b}-01`).getTime();
    }).slice(-5);
    
    const monthlyAmounts = sortedMonths.map(month => monthlyData[month] || 0);

    return { categories, amounts, colors, sortedMonths, monthlyAmounts };
  }, [expenses]);

  const monthlyBudget = getBudgetProgress('monthly');

  // Pie Chart Data
  const pieData = {
    labels: chartData.categories.length > 0 ? chartData.categories : ['No data'],
    datasets: [{
      data: chartData.amounts.length > 0 ? chartData.amounts : [1],
      backgroundColor: chartData.categories.length > 0 ? chartData.colors.slice(0, chartData.categories.length) : ['#e5e7eb'],
      borderWidth: 0,
    }],
  };

  // Line Chart Data
  const lineData = {
    labels: chartData.sortedMonths.length > 0 ? chartData.sortedMonths : ['No data'],
    datasets: [{
      label: 'Monthly Expenses',
      data: chartData.monthlyAmounts.length > 0 ? chartData.monthlyAmounts : [0],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      fill: true,
    }],
  };

  // Bar Chart Data
  const barData = {
    labels: chartData.categories.length > 0 ? chartData.categories : ['No data'],
    datasets: [{
      label: 'Amount Spent',
      data: chartData.amounts.length > 0 ? chartData.amounts : [0],
      backgroundColor: chartData.categories.length > 0 ? chartData.colors.slice(0, chartData.categories.length).map(c => c + '80') : ['rgba(229, 231, 235, 0.8)'],
      borderColor: chartData.categories.length > 0 ? chartData.colors.slice(0, chartData.categories.length) : ['#e5e7eb'],
      borderWidth: 1,
    }],
  };

  // Donut Chart Data for Budget Progress
  const donutData = {
    labels: ['Used Budget', 'Remaining Budget'],
    datasets: [{
      data: monthlyBudget.limit > 0 ? [monthlyBudget.spent, monthlyBudget.remaining] : [1, 0],
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
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {monthlyBudget.limit > 0 ? Math.round(monthlyBudget.percentage) : 0}%
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Used</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
