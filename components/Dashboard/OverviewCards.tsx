'use client';

import { motion } from 'framer-motion';
import { DollarSign, Target, TrendingDown, TrendingUp } from 'lucide-react';

const cards = [
  {
    title: 'Total Expenses',
    value: '$2,847.32',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'primary',
  },
  {
    title: 'Top Category',
    value: 'Food & Dining',
    change: '$987.50',
    trend: 'neutral',
    icon: TrendingUp,
    color: 'indigo',
  },
  {
    title: 'Budget Progress',
    value: '67%',
    change: '$1,652.68 left',
    trend: 'down',
    icon: Target,
    color: 'success',
    progress: 67,
  },
  {
    title: 'Daily Average',
    value: '$94.91',
    change: '-8.2%',
    trend: 'down',
    icon: TrendingDown,
    color: 'danger',
  },
];

export default function OverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        
        return (
          <motion.div
            key={card.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="card p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                card.color === 'primary' ? 'bg-primary-100 text-primary-600' :
                card.color === 'indigo' ? 'bg-indigo-100 text-indigo-600' :
                card.color === 'success' ? 'bg-success-100 text-success-600' :
                'bg-danger-100 text-danger-600'
              }`}>
                <Icon size={24} />
              </div>
              
              {card.trend === 'up' && (
                <span className="text-success-600 text-sm font-medium bg-success-50 px-2 py-1 rounded-lg">
                  {card.change}
                </span>
              )}
              {card.trend === 'down' && (
                <span className="text-danger-600 text-sm font-medium bg-danger-50 px-2 py-1 rounded-lg">
                  {card.change}
                </span>
              )}
              {card.trend === 'neutral' && (
                <span className="text-gray-600 text-sm font-medium bg-gray-100 px-2 py-1 rounded-lg">
                  {card.change}
                </span>
              )}
            </div>

            <div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                {card.title}
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {card.value}
              </p>
              
              {card.progress && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{card.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${card.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="bg-success-500 h-2 rounded-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
