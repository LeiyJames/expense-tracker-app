'use client';

import { motion } from 'framer-motion';
import { Edit2, Filter, Search, Trash2, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { categories, paymentMethods, Expense } from '../../data/mockData';
import { useData } from '../../context/DataContext';
import { formatPeso } from '../../lib/currency';
import EditExpenseModal from '../Modals/EditExpenseModal';
import Notification from '../UI/Notification';

export default function ExpensesTable() {
  const { expenses, deleteExpense, updateExpense } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('All Methods');
  const [amountRange, setAmountRange] = useState({ min: '', max: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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

  const filteredExpenses = expenses
    .filter(expense => {
      const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           expense.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All Categories' || expense.category === selectedCategory;
      const matchesPaymentMethod = selectedPaymentMethod === 'All Methods' || expense.paymentMethod === selectedPaymentMethod;
      const matchesAmountMin = !amountRange.min || expense.amount >= parseFloat(amountRange.min);
      const matchesAmountMax = !amountRange.max || expense.amount <= parseFloat(amountRange.max);
      
      return matchesSearch && matchesCategory && matchesPaymentMethod && matchesAmountMin && matchesAmountMax;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleDelete = (id: string) => {
    deleteExpense(id);
    setNotification({
      isVisible: true,
      type: 'success',
      title: 'Expense Deleted!',
      message: 'The expense has been successfully removed.',
    });
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setIsEditModalOpen(true);
  };

  const handleEditSave = (updatedExpense: Expense) => {
    updateExpense(updatedExpense);
    setNotification({
      isVisible: true,
      type: 'success',
      title: 'Expense Updated!',
      message: 'The expense has been successfully updated.',
    });
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="card p-6"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-0">
          All Expenses ({filteredExpenses.length})
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 w-64"
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary flex items-center space-x-2 ${showFilters ? 'bg-primary-100 text-primary-600' : ''}`}
          >
            <SlidersHorizontal size={20} />
            <span>Filters</span>
          </motion.button>
        </div>
      </div>

      {showFilters && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Payment Method
              </label>
              <select
                value={selectedPaymentMethod}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                className="input"
              >
                {paymentMethods.map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Min Amount
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={amountRange.min}
                onChange={(e) => setAmountRange(prev => ({ ...prev, min: e.target.value }))}
                className="input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Max Amount
              </label>
              <input
                type="number"
                placeholder="1000.00"
                value={amountRange.max}
                onChange={(e) => setAmountRange(prev => ({ ...prev, max: e.target.value }))}
                className="input"
              />
            </div>
          </div>
        </motion.div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Date</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Category</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Description</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Payment Method</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Amount</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense, index) => (
              <motion.tr
                key={expense.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="py-4 px-4 text-gray-900 dark:text-gray-300">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
                <td className="py-4 px-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300">
                    {expense.category}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <p className="text-gray-900 dark:text-gray-300 font-medium">
                      {expense.description}
                    </p>
                    {expense.notes && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {expense.notes}
                      </p>
                    )}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="inline-block px-2 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                    {expense.paymentMethod}
                  </span>
                </td>
                <td className="py-4 px-4 text-right font-semibold text-gray-900 dark:text-white">
                  {formatPeso(expense.amount)}
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEdit(expense)}
                      className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(expense.id)}
                      className="p-2 text-gray-500 hover:text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-900 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredExpenses.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No expenses found matching your criteria.</p>
        </div>
      )}

      <EditExpenseModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingExpense(null);
        }}
        onSave={handleEditSave}
        expense={editingExpense}
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
