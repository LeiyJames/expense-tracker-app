'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import AddCategoryModal from '../Modals/AddCategoryModal';
import Notification from '../UI/Notification';

export default function CategoriesHeader() {
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
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

  const handleAddCategory = (category: any) => {
    console.log('Adding category:', category);
    setNotification({
      isVisible: true,
      type: 'success',
      title: 'Category Added!',
      message: `Successfully added category: ${category.name}`,
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
            Categories
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Organize and manage your expense categories
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsAddCategoryModalOpen(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Category</span>
        </motion.button>
      </div>

      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        onSave={handleAddCategory}
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
