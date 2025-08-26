'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';
import { useEffect } from 'react';

interface NotificationProps {
  isVisible: boolean;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

export default function Notification({ 
  isVisible, 
  type, 
  title, 
  message, 
  onClose, 
  autoClose = true,
  duration = 4000 
}: NotificationProps) {
  useEffect(() => {
    if (isVisible && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, duration, onClose]);

  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: AlertCircle,
  };

  const colors = {
    success: {
      bg: 'bg-success-50 dark:bg-success-900',
      border: 'border-success-200 dark:border-success-700',
      icon: 'text-success-600 dark:text-success-400',
      title: 'text-success-900 dark:text-success-100',
      message: 'text-success-700 dark:text-success-300',
    },
    error: {
      bg: 'bg-danger-50 dark:bg-danger-900',
      border: 'border-danger-200 dark:border-danger-700',
      icon: 'text-danger-600 dark:text-danger-400',
      title: 'text-danger-900 dark:text-danger-100',
      message: 'text-danger-700 dark:text-danger-300',
    },
    info: {
      bg: 'bg-primary-50 dark:bg-primary-900',
      border: 'border-primary-200 dark:border-primary-700',
      icon: 'text-primary-600 dark:text-primary-400',
      title: 'text-primary-900 dark:text-primary-100',
      message: 'text-primary-700 dark:text-primary-300',
    },
  };

  const Icon = icons[type];
  const colorScheme = colors[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -50, x: '-50%' }}
          className={`fixed top-6 left-1/2 transform z-50 max-w-md w-full mx-4 p-4 rounded-xl border shadow-lg ${colorScheme.bg} ${colorScheme.border}`}
        >
          <div className="flex items-start space-x-3">
            <Icon className={`w-6 h-6 ${colorScheme.icon} flex-shrink-0 mt-0.5`} />
            <div className="flex-1 min-w-0">
              <h4 className={`text-sm font-semibold ${colorScheme.title}`}>
                {title}
              </h4>
              <p className={`text-sm ${colorScheme.message} mt-1`}>
                {message}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className={`p-1 ${colorScheme.icon} hover:opacity-75 flex-shrink-0`}
            >
              <X size={16} />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
