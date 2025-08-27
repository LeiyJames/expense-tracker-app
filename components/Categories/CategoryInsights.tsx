'use client';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { motion } from 'framer-motion';
import { Pie } from 'react-chartjs-2';
import { TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useMemo } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryInsights() {
  const { expenses } = useData();

  const categoryData = useMemo(() => {
    if (expenses.length === 0) {
      return {
        categoryTotals: {},
        totalSpent: 0,
        categories: [],
        amounts: [],
        transactionCounts: {},
      };
    }

    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    const transactionCounts = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const categories = Object.keys(categoryTotals);
    const amounts = Object.values(categoryTotals);
    const totalSpent = amounts.reduce((sum, amount) => sum + amount, 0);

    return { categoryTotals, totalSpent, categories, amounts, transactionCounts };
  }, [expenses]);

  const pieData = {
    labels: categoryData.categories.length > 0 ? categoryData.categories : ['No data'],
    datasets: [{
      data: categoryData.amounts.length > 0 ? categoryData.amounts : [1],
      backgroundColor: [
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
      ],
      borderWidth: 0,
    }],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          padding: 15,
          usePointStyle: true,
          color: '#374151',
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const insights = useMemo(() => {
    if (categoryData.categories.length === 0) {
      return [
        {
          icon: TrendingUp,
          title: 'No Data',
          description: 'Add expenses to see insights',
          value: '₱0.00',
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
        },
        {
          icon: TrendingDown,
          title: 'No Data',
          description: 'Add expenses to see insights',
          value: '₱0.00',
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
        },
        {
          icon: DollarSign,
          title: 'No Data',
          description: 'Add expenses to see insights',
          value: '₱0.00',
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
        },
        {
          icon: Target,
          title: 'No Data',
          description: 'Add expenses to see insights',
          value: '0 transactions',
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
        },
      ];
    }

    const sortedByAmount = Object.entries(categoryData.categoryTotals).sort(([,a], [,b]) => b - a);
    const sortedByTransactions = Object.entries(categoryData.transactionCounts).sort(([,a], [,b]) => b - a);
    
    const highest = sortedByAmount[0];
    const lowest = sortedByAmount[sortedByAmount.length - 1];
    const mostTransactions = sortedByTransactions[0];

    return [
      {
        icon: TrendingUp,
        title: 'Highest Spending',
        description: highest[0],
        value: `₱${highest[1].toFixed(2)}`,
        color: 'text-success-600',
        bgColor: 'bg-success-100',
      },
      {
        icon: TrendingDown,
        title: 'Lowest Spending',
        description: lowest[0],
        value: `₱${lowest[1].toFixed(2)}`,
        color: 'text-primary-600',
        bgColor: 'bg-primary-100',
      },
      {
        icon: DollarSign,
        title: 'Average per Category',
        description: 'Across all categories',
        value: `₱${(categoryData.totalSpent / categoryData.categories.length).toFixed(2)}`,
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-100',
      },
      {
        icon: Target,
        title: 'Most Transactions',
        description: mostTransactions[0],
        value: `${mostTransactions[1]} transactions`,
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
      },
    ];
  }, [categoryData]);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="card p-6"
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Category Insights
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Spending Distribution
          </h3>
          <div className="h-80">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>

        {/* Insights Cards */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Key Insights
          </h3>
          <div className="space-y-4">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              
              return (
                <motion.div
                  key={insight.title}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                >
                  <div className={`w-12 h-12 ${insight.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon size={20} className={insight.color} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {insight.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {insight.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">
                      {insight.value}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Summary Stats */}
          <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Summary
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Total Categories</p>
                <p className="font-bold text-gray-900 dark:text-white">
                  {categoryData.categories.length}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Total Spent</p>
                <p className="font-bold text-gray-900 dark:text-white">
                  ₱{categoryData.totalSpent.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
