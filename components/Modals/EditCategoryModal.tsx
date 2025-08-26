'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag, Palette } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Category } from '../../data/mockData';

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: Category) => void;
  category: Category | null;
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

export default function EditCategoryModal({ isOpen, onClose, onSave, category }: EditCategoryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    icon: '🍽️',
    color: 'bg-blue-500',
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        icon: category.icon,
        color: category.color,
      });
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return;
    
    const updatedCategory: Category = {
      ...category,
      name: formData.name,
      icon: formData.icon,
      color: formData.color,
    };
    
    onSave(updatedCategory);
    onClose();
  };

  if (!category) return null;

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
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-auto p-4 sm:p-6 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Edit Category
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

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Tag size={14} className="inline mr-2 sm:w-4 sm:h-4" />
                  Category Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="input text-sm sm:text-base"
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
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-lg sm:text-xl transition-all duration-300 ${
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
                  <Palette size={14} className="inline mr-2 sm:w-4 sm:h-4" />
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
                      className={`w-14 h-10 sm:w-16 sm:h-12 rounded-xl ${color.value} flex items-center justify-center transition-all duration-300 ${
                        formData.color === color.value
                          ? 'ring-4 ring-primary-300'
                          : 'hover:ring-2 hover:ring-gray-300'
                      }`}
                    >
                      {formData.color === color.value && (
                        <span className="text-white text-lg sm:text-xl">✓</span>
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
                  Update Category
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
