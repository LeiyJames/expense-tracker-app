'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, Calendar, Target, Info } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Budget } from '../../data/mockData';
import { useData } from '../../context/DataContext';
import { getCurrencySymbol } from '../../lib/currency';

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  budget?: Budget | null;
}

export default function BudgetModal({ isOpen, onClose, budget }: BudgetModalProps) {
  const { addBudget, updateBudget, budgets } = useData();
  const [formData, setFormData] = useState({
    type: 'monthly' as 'daily' | 'weekly' | 'monthly',
    amount: '',
    category: '',
    isActive: true,
  });

  useEffect(() => {
    if (budget) {
      setFormData({
        type: budget.type,
        amount: budget.amount.toString(),
        category: budget.category || '',
        isActive: budget.isActive,
      });
    } else {
      setFormData({
        type: 'monthly',
        amount: '',
        category: '',
        isActive: true,
      });
    }
  }, [budget, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) return;

    // Check if budget type already exists for this category
    const existingBudget = budgets.find(b => 
      b.type === formData.type && 
      b.category === (formData.category || undefined) &&
      b.id !== budget?.id
    );

    if (existingBudget && !budget) {
      alert(`A ${formData.type} budget already exists for this ${formData.category ? 'category' : 'overall spending'}. Please edit the existing one or choose a different type.`);
      return;
    }

    const budgetData: Budget = {
      id: budget?.id || Date.now().toString(),
      type: formData.type,
      amount: parseFloat(formData.amount),
      category: formData.category || undefined,
      isActive: formData.isActive,
      startDate: budget?.startDate || new Date().toISOString().split('T')[0],
    };

    if (budget) {
      updateBudget(budgetData);
    } else {
      addBudget(budgetData);
    }

    onClose();
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {budget ? 'Edit Budget' : 'Set Budget'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Budget Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="inline w-4 h-4 mr-2" />
                  Budget Period
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['daily', 'weekly', 'monthly'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleInputChange('type', type)}
                      className={`p-3 rounded-xl border-2 transition-all capitalize ${
                        formData.type === type
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <span className="inline-block w-4 h-4 mr-2 text-center">{getCurrencySymbol()}</span>
                  Budget Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
                    {getCurrencySymbol()}
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    className="input pl-10"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Target className="inline w-4 h-4 mr-2" />
                  Category (Optional)
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="input"
                >
                  <option value="">All Categories (Overall Budget)</option>
                  <option value="Food & Dining">Food & Dining</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Health & Fitness">Health & Fitness</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty for overall spending budget, or select a specific category
                </p>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Active Budget
                  </label>
                  <p className="text-xs text-gray-500">Enable budget tracking and alerts</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleInputChange('isActive', !formData.isActive)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.isActive ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.isActive ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <Info className="text-blue-500 mt-0.5" size={16} />
                  <div className="text-sm text-blue-700 dark:text-blue-300">
                    <p className="font-medium mb-1">Budget Tracking:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Daily budgets reset every day at midnight</li>
                      <li>• Weekly budgets reset every Sunday</li>
                      <li>• Monthly budgets reset on the 1st of each month</li>
                      <li>• Category budgets only track expenses in that category</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                >
                  {budget ? 'Update Budget' : 'Set Budget'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
