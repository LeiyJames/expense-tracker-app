'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, Calendar, Tag, CreditCard, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { categories, paymentMethods, Expense } from '../../data/mockData';
import { getCurrencySymbol } from '../../lib/currency';

interface EditExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (expense: Expense) => void;
  expense: Expense | null;
}

export default function EditExpenseModal({ isOpen, onClose, onSave, expense }: EditExpenseModalProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: 'Food & Dining',
    description: '',
    amount: '',
    paymentMethod: 'Credit Card',
    notes: '',
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        date: expense.date,
        category: expense.category,
        description: expense.description,
        amount: expense.amount.toString(),
        paymentMethod: expense.paymentMethod,
        notes: expense.notes || '',
      });
    }
  }, [expense]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expense) return;
    
    const updatedExpense: Expense = {
      ...expense,
      date: formData.date,
      category: formData.category,
      description: formData.description,
      amount: parseFloat(formData.amount),
      paymentMethod: formData.paymentMethod,
      notes: formData.notes,
    };
    
    onSave(updatedExpense);
    onClose();
  };

  if (!expense) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md lg:max-w-4xl mx-auto p-4 sm:p-6 max-h-[95vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Edit Expense
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg"
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-2 lg:gap-8 space-y-3 sm:space-y-4 lg:space-y-0">
              {/* Left Column */}
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Calendar size={14} className="inline mr-2 sm:w-4 sm:h-4" />
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="input text-sm sm:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Tag size={14} className="inline mr-2 sm:w-4 sm:h-4" />
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="input text-sm sm:text-base"
                    required
                  >
                    {categories.filter(cat => cat !== 'All Categories').map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FileText size={14} className="inline mr-2 sm:w-4 sm:h-4" />
                    Description
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="input text-sm sm:text-base"
                    placeholder="Enter expense description"
                    required
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <span className="inline-block w-4 h-4 mr-2 text-center">{getCurrencySymbol()}</span>
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
                      {getCurrencySymbol()}
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                      className="input text-sm sm:text-base pl-10"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <CreditCard size={14} className="inline mr-2 sm:w-4 sm:h-4" />
                    Payment Method
                  </label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                    className="input text-sm sm:text-base"
                    required
                  >
                    {paymentMethods.filter(method => method !== 'All Methods').map(method => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    className="input resize-none text-sm sm:text-base"
                    rows={2}
                    placeholder="Add any additional notes..."
                  />
                </div>
              </div>

              {/* Buttons span full width */}
              <div className="lg:col-span-2 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-6">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 btn-secondary text-sm sm:text-base py-2 sm:py-3"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 btn-primary text-sm sm:text-base py-2 sm:py-3"
                >
                  Update Expense
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
