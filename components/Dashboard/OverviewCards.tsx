'use client';

import { motion } from 'framer-motion';
import { DollarSign, Target, TrendingDown, TrendingUp } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { formatPeso } from '../../lib/currency';

export default function OverviewCards() {
  const { expenses, categories, getBudgetProgress } = useData();
  
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);
  
  const topCategory = Object.entries(categoryTotals)
    .sort(([,a], [,b]) => b - a)[0];
  
  const monthlyBudget = getBudgetProgress('monthly');
  const dailyBudget = getBudgetProgress('daily');
  const weeklyBudget = getBudgetProgress('weekly');
  
  const cards = [
    {
      title: 'Monthly Budget',
      value: monthlyBudget.limit > 0 ? formatPeso(monthlyBudget.spent) : 'No budget set',
      change: monthlyBudget.limit > 0 ? `${formatPeso(monthlyBudget.remaining)} left` : 'Click to set budget',
      trend: monthlyBudget.percentage > 80 ? 'up' : monthlyBudget.percentage > 50 ? 'neutral' : 'down',
      icon: Target,
      color: monthlyBudget.percentage > 80 ? 'danger' : monthlyBudget.percentage > 50 ? 'warning' : 'success',
      progress: monthlyBudget.percentage,
    },
    {
      title: 'Weekly Budget',
      value: weeklyBudget.limit > 0 ? formatPeso(weeklyBudget.spent) : 'No budget set',
      change: weeklyBudget.limit > 0 ? `${formatPeso(weeklyBudget.remaining)} left` : 'Click to set budget',
      trend: weeklyBudget.percentage > 80 ? 'up' : weeklyBudget.percentage > 50 ? 'neutral' : 'down',
      icon: TrendingUp,
      color: weeklyBudget.percentage > 80 ? 'danger' : weeklyBudget.percentage > 50 ? 'warning' : 'indigo',
      progress: weeklyBudget.percentage,
    },
    {
      title: 'Daily Budget',
      value: dailyBudget.limit > 0 ? formatPeso(dailyBudget.spent) : 'No budget set',
      change: dailyBudget.limit > 0 ? `${formatPeso(dailyBudget.remaining)} left` : 'Click to set budget',
      trend: dailyBudget.percentage > 80 ? 'up' : dailyBudget.percentage > 50 ? 'neutral' : 'down',
      icon: DollarSign,
      color: dailyBudget.percentage > 80 ? 'danger' : dailyBudget.percentage > 50 ? 'warning' : 'primary',
      progress: dailyBudget.percentage,
    },
    {
      title: 'Top Category',
      value: topCategory ? topCategory[0] : 'No expenses',
      change: topCategory ? formatPeso(topCategory[1]) : formatPeso(0),
      trend: 'neutral',
      icon: TrendingDown,
      color: 'success',
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        
        return (
          <motion.div
            key={card.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="card p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                card.color === 'primary' ? 'bg-primary-100 text-primary-600' :
                card.color === 'indigo' ? 'bg-indigo-100 text-indigo-600' :
                card.color === 'success' ? 'bg-success-100 text-success-600' :
                'bg-danger-100 text-danger-600'
              }`}>
                <Icon size={24} />
              </div>
              
              {card.trend === 'up' && (
                <span className="text-success-600 text-sm font-medium bg-success-50 px-2 py-1 rounded-lg">
                  {card.change}
                </span>
              )}
              {card.trend === 'down' && (
                <span className="text-danger-600 text-sm font-medium bg-danger-50 px-2 py-1 rounded-lg">
                  {card.change}
                </span>
              )}
              {card.trend === 'neutral' && (
                <span className="text-gray-600 text-sm font-medium bg-gray-100 px-2 py-1 rounded-lg">
                  {card.change}
                </span>
              )}
            </div>

            <div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                {card.title}
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {card.value}
              </p>
              
              {card.progress && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{card.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${card.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="bg-success-500 h-2 rounded-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
