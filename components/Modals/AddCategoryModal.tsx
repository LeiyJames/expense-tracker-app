'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag, Palette } from 'lucide-react';
import { useState } from 'react';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: any) => void;
}

const colorOptions = [
  { name: 'Blue', value: 'bg-blue-500' },
  { name: 'Green', value: 'bg-green-500' },
  { name: 'Purple', value: 'bg-purple-500' },
  { name: 'Pink', value: 'bg-pink-500' },
  { name: 'Yellow', value: 'bg-yellow-500' },
  { name: 'Red', value: 'bg-red-500' },
  { name: 'Indigo', value: 'bg-indigo-500' },
  { name: 'Orange', value: 'bg-orange-500' },
];

const iconOptions = ['🍽️', '🚗', '🛍️', '🎬', '⚡', '💪', '🏠', '📚', '💊', '🎮', '✈️', '🎵'];

export default function AddCategoryModal({ isOpen, onClose, onSave }: AddCategoryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    icon: '🍽️',
    color: 'bg-blue-500',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCategory = {
      id: Date.now().toString(),
      name: formData.name,
      icon: formData.icon,
      color: formData.color,
      totalSpent: 0,
      transactionCount: 0,
    };
    onSave(newCategory);
    setFormData({
      name: '',
      icon: '🍽️',
      color: 'bg-blue-500',
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
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
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 p-4 sm:p-6 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Add New Category
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg"
              >
                <X size={24} />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Tag size={16} className="inline mr-2" />
                  Category Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="input"
                  placeholder="Enter category name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Choose Icon
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {iconOptions.map((icon) => (
                    <motion.button
                      key={icon}
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setFormData(prev => ({ ...prev, icon }))}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300 ${
                        formData.icon === icon
                          ? 'bg-primary-100 border-2 border-primary-400'
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {icon}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <Palette size={16} className="inline mr-2" />
                  Choose Color
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  {colorOptions.map((color) => (
                    <motion.button
                      key={color.value}
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                      className={`w-16 h-12 rounded-xl ${color.value} flex items-center justify-center transition-all duration-300 ${
                        formData.color === color.value
                          ? 'ring-4 ring-primary-300'
                          : 'hover:ring-2 hover:ring-gray-300'
                      }`}
                    >
                      {formData.color === color.value && (
                        <span className="text-white text-xl">✓</span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 btn-primary"
                >
                  Add Category
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
