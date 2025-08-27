'use client';

import { motion } from 'framer-motion';
import { FileText, Download, FileSpreadsheet, CalendarDays } from 'lucide-react';
import { useState } from 'react';
import { categories } from '../../data/mockData';
import { useData } from '../../context/DataContext';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Notification from '../UI/Notification';

export default function ExportOptions() {
  const { expenses } = useData();
  const [selectedFormat, setSelectedFormat] = useState('csv');
  const [dateRange, setDateRange] = useState({ start: '2024-01-01', end: '2024-01-31' });
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All Categories']);
  const [includeNotes, setIncludeNotes] = useState(true);
  const [includePaymentMethod, setIncludePaymentMethod] = useState(true);
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

  const exportFormats = [
    {
      id: 'csv',
      name: 'CSV',
      description: 'Comma-separated values for Excel/Sheets',
      icon: FileSpreadsheet,
      color: 'text-success-600',
      bgColor: 'bg-success-100',
    },
    {
      id: 'excel',
      name: 'Excel',
      description: 'Microsoft Excel format (.xlsx)',
      icon: FileSpreadsheet,
      color: 'text-primary-600',
      bgColor: 'bg-primary-100',
    },
    {
      id: 'pdf',
      name: 'PDF',
      description: 'Formatted report for printing',
      icon: FileText,
      color: 'text-danger-600',
      bgColor: 'bg-danger-100',
    },
  ];

  const handleCategoryToggle = (category: string) => {
    if (category === 'All Categories') {
      setSelectedCategories(['All Categories']);
    } else {
      const newSelected = selectedCategories.filter(cat => cat !== 'All Categories');
      if (selectedCategories.includes(category)) {
        const updated = newSelected.filter(cat => cat !== category);
        setSelectedCategories(updated.length === 0 ? ['All Categories'] : updated);
      } else {
        setSelectedCategories([...newSelected, category]);
      }
    }
  };

  const handleExport = () => {
    const filteredData = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      
      const isInDateRange = expenseDate >= startDate && expenseDate <= endDate;
      const isInSelectedCategories = selectedCategories.includes('All Categories') || 
                                   selectedCategories.includes(expense.category);
      
      return isInDateRange && isInSelectedCategories;
    });

    if (selectedFormat === 'csv') {
      exportToCSV(filteredData);
    } else if (selectedFormat === 'excel') {
      exportToExcel(filteredData);
    } else if (selectedFormat === 'pdf') {
      exportToPDF(filteredData);
    }
  };

  const exportToCSV = (data: any[]) => {
    const headers = ['Date', 'Category', 'Description'];
    if (includePaymentMethod) headers.push('Payment Method');
    headers.push('Amount');
    if (includeNotes) headers.push('Notes');

    const csvContent = [
      headers.join(','),
      ...data.map(expense => {
        const row = [
          expense.date,
          expense.category,
          `"${expense.description}"`
        ];
        if (includePaymentMethod) row.push(expense.paymentMethod);
        row.push(expense.amount.toFixed(2));
        if (includeNotes) row.push(`"${expense.notes || ''}"`);
        return row.join(',');
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `expenses_${dateRange.start}_to_${dateRange.end}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setNotification({
      isVisible: true,
      type: 'success',
      title: 'Export Successful!',
      message: `CSV file with ${data.length} records has been downloaded.`,
    });
  };

  const exportToExcel = (data: any[]) => {
    // For now, we'll export as CSV since we don't have xlsx library
    exportToCSV(data);
    setNotification({
      isVisible: true,
      type: 'info',
      title: 'Excel Export',
      message: 'Exported as CSV format. For full Excel support, please install xlsx library.',
    });
  };

  const exportToPDF = (data: any[]) => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Expense Report', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);
    doc.text(`Date Range: ${dateRange.start} to ${dateRange.end}`, 20, 45);
    
    const headers = ['Date', 'Category', 'Description'];
    if (includePaymentMethod) headers.push('Payment Method');
    headers.push('Amount');
    if (includeNotes) headers.push('Notes');

    const tableData = data.map(expense => {
      const row = [
        expense.date,
        expense.category,
        expense.description
      ];
      if (includePaymentMethod) row.push(expense.paymentMethod);
      row.push(`$${expense.amount.toFixed(2)}`);
      if (includeNotes) row.push(expense.notes || '');
      return row;
    });

    autoTable(doc, {
      head: [headers],
      body: tableData,
      startY: 55,
      theme: 'grid',
      styles: {
        fontSize: 8,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [59, 130, 246],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252],
      },
    });

    const totalAmount = data.reduce((sum, expense) => sum + expense.amount, 0);
    const finalY = (doc as any).lastAutoTable.finalY || 55;
    
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text(`Total Expenses: $${totalAmount.toFixed(2)}`, 20, finalY + 20);
    doc.text(`Number of Transactions: ${data.length}`, 20, finalY + 35);

    doc.save(`expenses_${dateRange.start}_to_${dateRange.end}.pdf`);

    setNotification({
      isVisible: true,
      type: 'success',
      title: 'PDF Export Successful!',
      message: `PDF report with ${data.length} records has been downloaded.`,
    });
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="space-y-6"
    >
      {/* Export Format */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Export Format
        </h3>
        <div className="space-y-3">
          {exportFormats.map((format) => {
            const Icon = format.icon;
            const isSelected = selectedFormat === format.id;
            
            return (
              <motion.button
                key={format.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedFormat(format.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                  isSelected
                    ? 'border-primary-300 bg-primary-50 dark:bg-primary-900'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${format.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon size={20} className={format.color} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {format.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {format.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Date Range */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Date Range
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Start Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="input pr-10"
              />
              <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              End Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="input pr-10"
              />
              <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-gray-900 dark:text-white">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Additional Options */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Include Data
        </h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeNotes}
              onChange={(e) => setIncludeNotes(e.target.checked)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="text-gray-900 dark:text-white">Include Notes</span>
          </label>
          
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includePaymentMethod}
              onChange={(e) => setIncludePaymentMethod(e.target.checked)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="text-gray-900 dark:text-white">Include Payment Method</span>
          </label>
        </div>
      </div>

      {/* Export Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleExport}
        className="w-full btn-primary flex items-center justify-center space-x-2 text-lg py-4"
      >
        <Download size={24} />
        <span>Export {selectedFormat.toUpperCase()}</span>
      </motion.button>

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
