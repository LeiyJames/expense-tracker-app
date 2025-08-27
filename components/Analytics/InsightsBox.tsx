'use client';

import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, TrendingDown, Target, AlertTriangle } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useMemo } from 'react';

export default function InsightsBox() {
  const { expenses, getBudgetProgress } = useData();

  const insights = useMemo(() => {
    if (expenses.length === 0) {
      return [{
        icon: Target,
        type: 'info',
        title: 'Start Tracking',
        description: 'Add your first expense to get personalized insights.',
        suggestion: 'Click the "Add Expense" button to begin tracking your spending.',
        color: 'text-primary-600',
        bgColor: 'bg-primary-50',
        borderColor: 'border-primary-200',
      }];
    }

    const monthlyBudget = getBudgetProgress('monthly');
    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    const topCategory = Object.entries(categoryTotals).sort(([,a], [,b]) => b - a)[0];
    const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const avgExpense = totalSpent / expenses.length;

    const dynamicInsights = [];

    // Budget insight
    if (monthlyBudget.limit > 0) {
      if (monthlyBudget.percentage > 80) {
        dynamicInsights.push({
          icon: AlertTriangle,
          type: 'warning',
          title: 'Budget Alert',
          description: `You've used ${Math.round(monthlyBudget.percentage)}% of your monthly budget.`,
          suggestion: 'Consider reducing discretionary spending for the rest of the month.',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
        });
      } else if (monthlyBudget.percentage < 50) {
        dynamicInsights.push({
          icon: TrendingUp,
          type: 'positive',
          title: 'Great Progress!',
          description: `You're doing well! Only ${Math.round(monthlyBudget.percentage)}% of your budget used.`,
          suggestion: 'Keep up the good financial discipline.',
          color: 'text-success-600',
          bgColor: 'bg-success-50',
          borderColor: 'border-success-200',
        });
      }
    }

    // Top category insight
    if (topCategory) {
      const percentage = Math.round((topCategory[1] / totalSpent) * 100);
      dynamicInsights.push({
        icon: Target,
        type: 'insight',
        title: 'Top Spending Category',
        description: `${topCategory[0]} accounts for ${percentage}% of your total expenses.`,
        suggestion: `Focus on optimizing ${topCategory[0]} expenses to maximize savings.`,
        color: 'text-primary-600',
        bgColor: 'bg-primary-50',
        borderColor: 'border-primary-200',
      });
    }

    // Average expense insight
    if (avgExpense > 0) {
      dynamicInsights.push({
        icon: TrendingDown,
        type: 'insight',
        title: 'Spending Pattern',
        description: `Your average expense is ₱${avgExpense.toFixed(2)} per transaction.`,
        suggestion: 'Track smaller expenses to identify patterns and potential savings.',
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200',
      });
    }

    // Recent activity insight
    const recentExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return expenseDate >= weekAgo;
    });

    if (recentExpenses.length > 0) {
      const recentTotal = recentExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      dynamicInsights.push({
        icon: AlertTriangle,
        type: 'info',
        title: 'Recent Activity',
        description: `You've spent ₱${recentTotal.toFixed(2)} in the last 7 days across ${recentExpenses.length} transactions.`,
        suggestion: 'Review recent expenses to ensure they align with your budget goals.',
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-50',
        borderColor: 'border-indigo-200',
      });
    }

    return dynamicInsights.slice(0, 4); // Limit to 4 insights
  }, [expenses, getBudgetProgress]);

  const summaryStats = useMemo(() => {
    const monthlyBudget = getBudgetProgress('monthly');
    const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const avgEfficiency = monthlyBudget.limit > 0 ? Math.max(0, 100 - monthlyBudget.percentage) : 0;
    
    return {
      potentialSavings: Math.round(totalSpent * 0.1), // Assume 10% potential savings
      budgetEfficiency: Math.round(avgEfficiency),
      goalProgress: Math.min(100, Math.round(monthlyBudget.percentage)),
    };
  }, [expenses, getBudgetProgress]);

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
          <p className="text-2xl font-bold text-success-600">₱{summaryStats.potentialSavings}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">per month</p>
        </div>
        
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
            Budget Efficiency
          </h4>
          <p className="text-2xl font-bold text-primary-600">{summaryStats.budgetEfficiency}%</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">optimization score</p>
        </div>
        
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
            Goal Progress
          </h4>
          <p className="text-2xl font-bold text-indigo-600">{summaryStats.goalProgress}%</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">on track</p>
        </div>
      </div>
    </motion.div>
  );
}
