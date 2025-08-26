'use client';

import { motion } from 'framer-motion';
import { Eye, FileText, Download } from 'lucide-react';
import { mockExpenses } from '../../data/mockData';

export default function ExportPreview() {
  const previewData = mockExpenses.slice(0, 10); // Show first 10 for preview

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="space-y-6"
    >
      {/* Preview Header */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
              <Eye size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Export Preview
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Preview of your export data
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Records</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {mockExpenses.length}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Date Range</p>
            <p className="font-semibold text-gray-900 dark:text-white">Jan 2024</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Categories</p>
            <p className="font-semibold text-gray-900 dark:text-white">6 Selected</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              ${mockExpenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Data Preview Table */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900 dark:text-white">
            Data Preview ({previewData.length} of {mockExpenses.length} records)
          </h4>
          <span className="text-xs bg-primary-100 text-primary-600 px-2 py-1 rounded-full">
            Preview Mode
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-white">Date</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-white">Category</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-white">Description</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-white">Payment</th>
                <th className="text-right py-3 px-2 font-semibold text-gray-900 dark:text-white">Amount</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-white">Notes</th>
              </tr>
            </thead>
            <tbody>
              {previewData.map((expense, index) => (
                <motion.tr
                  key={expense.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="border-b border-gray-100 dark:border-gray-700"
                >
                  <td className="py-3 px-2 text-gray-900 dark:text-gray-300">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-2">
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300">
                      {expense.category}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-gray-900 dark:text-gray-300">
                    {expense.description}
                  </td>
                  <td className="py-3 px-2">
                    <span className="inline-block px-2 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                      {expense.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right font-semibold text-gray-900 dark:text-white">
                    ${expense.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-2 text-gray-600 dark:text-gray-400 text-xs">
                    {expense.notes || '-'}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {mockExpenses.length > previewData.length && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              + {mockExpenses.length - previewData.length} more records will be included in the export
            </p>
          </div>
        )}
      </div>

      {/* Export Summary */}
      <div className="card p-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
          Export Summary
        </h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-gray-600 dark:text-gray-400">File Format</span>
            <span className="font-medium text-gray-900 dark:text-white">CSV</span>
          </div>
          
          <div className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-gray-600 dark:text-gray-400">Date Range</span>
            <span className="font-medium text-gray-900 dark:text-white">Jan 1 - Jan 31, 2024</span>
          </div>
          
          <div className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-gray-600 dark:text-gray-400">Categories</span>
            <span className="font-medium text-gray-900 dark:text-white">All Categories</span>
          </div>
          
          <div className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-gray-600 dark:text-gray-400">Include Notes</span>
            <span className="font-medium text-gray-900 dark:text-white">Yes</span>
          </div>
          
          <div className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-gray-600 dark:text-gray-400">Include Payment Method</span>
            <span className="font-medium text-gray-900 dark:text-white">Yes</span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-success-50 to-primary-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-success-100 text-success-600 rounded-lg flex items-center justify-center">
              <FileText size={16} />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Ready to Export</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your data is ready for download. Click the export button to proceed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
