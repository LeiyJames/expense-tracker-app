'use client';

import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, TrendingDown, Target, AlertTriangle } from 'lucide-react';

export default function InsightsBox() {
  const insights = [
    {
      icon: TrendingUp,
      type: 'positive',
      title: 'Great Progress!',
      description: 'You\'ve reduced transportation costs by 15% this month compared to last month.',
      suggestion: 'Keep up the good work with public transportation and carpooling.',
      color: 'text-success-600',
      bgColor: 'bg-success-50',
      borderColor: 'border-success-200',
    },
    {
      icon: AlertTriangle,
      type: 'warning',
      title: 'Budget Alert',
      description: 'Food & Dining expenses are 23% higher than your monthly average.',
      suggestion: 'Consider meal planning and cooking at home more often to reduce costs.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
    },
    {
      icon: Target,
      type: 'goal',
      title: 'Savings Opportunity',
      description: 'You could save $120/month by optimizing your utility usage.',
      suggestion: 'Switch to energy-efficient appliances and monitor usage patterns.',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200',
    },
    {
      icon: TrendingDown,
      type: 'insight',
      title: 'Spending Pattern',
      description: 'Your entertainment spending peaks on weekends, averaging $45 per weekend.',
      suggestion: 'Look for weekday entertainment discounts or free activities.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
  ];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="card p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
          <Lightbulb size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Smart Insights & Suggestions
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            AI-powered recommendations to optimize your spending
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          
          return (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className={`p-4 rounded-xl border-2 ${insight.bgColor} ${insight.borderColor} transition-all duration-300 hover:shadow-md`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 ${insight.bgColor} rounded-lg flex items-center justify-center border ${insight.borderColor}`}>
                  <Icon size={20} className={insight.color} />
                </div>
                
                <div className="flex-1">
                  <h3 className={`font-semibold ${insight.color} mb-2`}>
                    {insight.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                    {insight.description}
                  </p>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-900 dark:text-white">Suggestion:</span>{' '}
                      {insight.suggestion}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
            Potential Savings
          </h4>
          <p className="text-2xl font-bold text-success-600">$120</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">per month</p>
        </div>
        
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
            Budget Efficiency
          </h4>
          <p className="text-2xl font-bold text-primary-600">87%</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">optimization score</p>
        </div>
        
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
            Goal Progress
          </h4>
          <p className="text-2xl font-bold text-indigo-600">67%</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">on track</p>
        </div>
      </div>
    </motion.div>
  );
}
