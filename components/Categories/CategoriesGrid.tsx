'use client';

import { motion } from 'framer-motion';
import { Edit2, Trash2, TrendingUp, DollarSign, Plus } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Category } from '../../data/mockData';
import { useData } from '../../context/DataContext';
import AddCategoryModal from '../Modals/AddCategoryModal';
import EditCategoryModal from '../Modals/EditCategoryModal';
import Notification from '../UI/Notification';

export default function CategoriesGrid() {
  const { categories, expenses, addCategory, updateCategory, deleteCategory } = useData();
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
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

  const handleDelete = (id: string) => {
    deleteCategory(id);
    setNotification({
      isVisible: true,
      type: 'success',
      title: 'Category Deleted!',
      message: 'Category has been successfully removed.',
    });
  };

  const handleAddCategory = (category: any) => {
    addCategory(category);
    setNotification({
      isVisible: true,
      type: 'success',
      title: 'Category Added!',
      message: `Successfully added category: ${category.name}`,
    });
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsEditModalOpen(true);
  };

  const handleEditSave = (updatedCategory: Category) => {
    updateCategory(updatedCategory);
    setNotification({
      isVisible: true,
      type: 'success',
      title: 'Category Updated!',
      message: `Successfully updated category: ${updatedCategory.name}`,
    });
  };

  // Calculate dynamic stats for each category
  const categoriesWithStats = useMemo(() => {
    return categories.map(category => {
      const categoryExpenses = expenses.filter(expense => expense.category === category.name);
      const totalSpent = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      const transactionCount = categoryExpenses.length;
      
      return {
        ...category,
        totalSpent,
        transactionCount,
      };
    });
  }, [categories, expenses]);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mb-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesWithStats.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="card p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center text-white text-xl`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {category.transactionCount} transactions
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleEdit(category)}
                  className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900 rounded-lg transition-colors"
                >
                  <Edit2 size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(category.id)}
                  className="p-2 text-gray-500 hover:text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-900 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </motion.button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Spent</span>
                </div>
                <span className="font-bold text-xl text-gray-900 dark:text-white">
                  ₱{category.totalSpent.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Average</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  ₱{category.transactionCount > 0 ? (category.totalSpent / category.transactionCount).toFixed(2) : '0.00'}
                </span>
              </div>

              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((category.totalSpent / 300) * 100, 100)}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className={`h-2 rounded-full ${category.color.replace('bg-', 'bg-')}`}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>Progress</span>
                  <span>{Math.min((category.totalSpent / 300) * 100, 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Add New Category Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoriesWithStats.length * 0.1 }}
          whileHover={{ y: -4, scale: 1.02 }}
          onClick={() => setIsAddCategoryModalOpen(true)}
          className="card p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-300 cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mb-4">
              <Plus size={24} className="text-gray-400" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
              Add New Category
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Create a custom category for your expenses
            </p>
          </div>
        </motion.div>
      </div>

      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        onSave={handleAddCategory}
      />

      <EditCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingCategory(null);
        }}
        onSave={handleEditSave}
        category={editingCategory}
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
