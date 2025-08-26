'use client';

import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, CreditCard } from 'lucide-react';
import { mockExpenses, mockCategories } from '../../data/mockData';

export default function ExpensesSidebar() {
  const totalExpenses = mockExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const thisMonthExpenses = mockExpenses
    .filter(expense => new Date(expense.date).getMonth() === new Date().getMonth())
    .reduce((sum, expense) => sum + expense.amount, 0);
  
  const topCategories = mockCategories
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 3);

  const recentExpenses = mockExpenses.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Quick Totals */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Totals
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
                <DollarSign size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                <p className="font-bold text-gray-900 dark:text-white">${totalExpenses.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success-100 text-success-600 rounded-lg flex items-center justify-center">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
                <p className="font-bold text-gray-900 dark:text-white">${thisMonthExpenses.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
                <CreditCard size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Transactions</p>
                <p className="font-bold text-gray-900 dark:text-white">{mockExpenses.length}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Top 3 Categories */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Top Categories
        </h3>
        
        <div className="space-y-3">
          {topCategories.map((category, index) => (
            <div key={category.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center text-white text-sm`}>
                  {category.icon}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">
                    {category.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {category.transactionCount} transactions
                  </p>
                </div>
              </div>
              <p className="font-bold text-gray-900 dark:text-white">
                ${category.totalSpent.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Expenses */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Expenses
        </h3>
        
        <div className="space-y-3">
          {recentExpenses.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">
                  {expense.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(expense.date).toLocaleDateString()} • {expense.category}
                </p>
              </div>
              <p className="font-bold text-gray-900 dark:text-white">
                ${expense.amount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
