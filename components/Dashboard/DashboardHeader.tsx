'use client';

import { motion } from 'framer-motion';
import { CalendarDays, Plus } from 'lucide-react';
import { useState } from 'react';
import AddExpenseModal from '../Modals/AddExpenseModal';
import Notification from '../UI/Notification';

export default function DashboardHeader() {
  const [dateRange, setDateRange] = useState('Last 30 days');
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
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

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleAddExpense = (expense: any) => {
    // In a real app, this would save to a database
    console.log('Adding expense:', expense);
    setNotification({
      isVisible: true,
      type: 'success',
      title: 'Expense Added!',
      message: `Successfully added expense: ${expense.description}`,
    });
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="mb-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Good morning, John! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{currentDate}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="input pr-10 appearance-none cursor-pointer"
            >
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Last year</option>
              <option>Custom range</option>
            </select>
            <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAddExpenseModalOpen(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Add Expense</span>
          </motion.button>
        </div>
      </div>

      <AddExpenseModal
        isOpen={isAddExpenseModalOpen}
        onClose={() => setIsAddExpenseModalOpen(false)}
        onSave={handleAddExpense}
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
