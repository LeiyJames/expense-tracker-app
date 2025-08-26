'use client';

import { motion } from 'framer-motion';
import { Target, Plus, Edit2, Trash2, Calendar, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Budget } from '../../data/mockData';
import { formatPeso } from '../../lib/currency';
import BudgetModal from '../Modals/BudgetModal';
import Notification from '../UI/Notification';

export default function BudgetManagement() {
  const { budgets, deleteBudget, getBudgetProgress } = useData();
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [notification, setNotification] = useState<{
    isVisible: boolean;
    type: 'success' | 'error' | 'info';
    title: string;
    message: string;
  }>({
    isVisible: false,
    type: 'success',
    title: '',
    message: '',
  });

  const handleEdit = (budget: Budget) => {
    setEditingBudget(budget);
    setIsBudgetModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteBudget(id);
    setNotification({
      isVisible: true,
      type: 'success',
      title: 'Budget Deleted!',
      message: 'Budget has been successfully removed.',
    });
  };

  const handleCloseModal = () => {
    setIsBudgetModalOpen(false);
    setEditingBudget(null);
  };

  const getBudgetTypeIcon = (type: string) => {
    switch (type) {
      case 'daily': return <Calendar size={20} />;
      case 'weekly': return <TrendingUp size={20} />;
      case 'monthly': return <Target size={20} />;
      default: return <DollarSign size={20} />;
    }
  };

  const getBudgetColor = (percentage: number) => {
    if (percentage >= 90) return 'danger';
    if (percentage >= 75) return 'warning';
    if (percentage >= 50) return 'indigo';
    return 'success';
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Budget Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Set and track your spending limits
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsBudgetModalOpen(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Budget</span>
        </motion.button>
      </div>

      {/* Budget Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['daily', 'weekly', 'monthly'].map((period) => {
          const progress = getBudgetProgress(period as 'daily' | 'weekly' | 'monthly');
          const color = getBudgetColor(progress.percentage);
          
          return (
            <motion.div
              key={period}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${color}-100 text-${color}-600 rounded-xl flex items-center justify-center`}>
                  {getBudgetTypeIcon(period)}
                </div>
                {progress.percentage >= 80 && (
                  <AlertCircle className="text-danger-500" size={20} />
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 capitalize">
                {period} Budget
              </h3>
              
              {progress.limit > 0 ? (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Spent</span>
                    <span className="font-medium">{formatPeso(progress.spent)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Budget</span>
                    <span className="font-medium">{formatPeso(progress.limit)}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`bg-${color}-500 h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${Math.min(progress.percentage, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className={`text-${color}-600 font-medium`}>
                      {progress.percentage.toFixed(1)}% used
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {formatPeso(progress.remaining)} left
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                    No {period} budget set
                  </p>
                  <button
                    onClick={() => setIsBudgetModalOpen(true)}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Set Budget
                  </button>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Budget List */}
      <div className="card">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            All Budgets
          </h2>
        </div>

        <div className="overflow-x-auto">
          {budgets.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Spent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {budgets.map((budget, index) => {
                  const progress = getBudgetProgress(budget.type, budget.category);
                  const color = getBudgetColor(progress.percentage);
                  
                  return (
                    <motion.tr
                      key={budget.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 bg-${color}-100 text-${color}-600 rounded-lg flex items-center justify-center`}>
                            {getBudgetTypeIcon(budget.type)}
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                            {budget.type}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {budget.category || 'All Categories'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {formatPeso(budget.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {formatPeso(progress.spent)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className={`bg-${color}-500 h-2 rounded-full`}
                            style={{ width: `${Math.min(progress.percentage, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 mt-1">
                          {progress.percentage.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          budget.isActive 
                            ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-300'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {budget.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEdit(budget)}
                            className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900 rounded-lg transition-colors"
                          >
                            <Edit2 size={16} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDelete(budget.id)}
                            className="p-2 text-gray-500 hover:text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-900 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12">
              <Target className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No budgets set
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Get started by creating your first budget to track your spending
              </p>
              <button
                onClick={() => setIsBudgetModalOpen(true)}
                className="btn-primary"
              >
                Create Budget
              </button>
            </div>
          )}
        </div>
      </div>

      <BudgetModal
        isOpen={isBudgetModalOpen}
        onClose={handleCloseModal}
        budget={editingBudget}
      />

      <Notification
        isVisible={notification.isVisible}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
      />
    </motion.div>
  );
}
