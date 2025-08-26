'use client';

import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { mockExpenses } from '../../data/mockData';
import { useState } from 'react';
import Notification from '../UI/Notification';

export default function ExportData() {
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

  const exportToCSV = () => {
    const headers = ['Date', 'Category', 'Description', 'Amount'];
    const csvContent = [
      headers.join(','),
      ...mockExpenses.map(expense => [
        expense.date,
        expense.category,
        `"${expense.description}"`,
        expense.amount.toFixed(2)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'expenses.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setNotification({
      isVisible: true,
      type: 'success',
      title: 'CSV Export Successful!',
      message: `Downloaded CSV with ${mockExpenses.length} expense records.`,
    });
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Expense Report', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);
    
    const tableData = mockExpenses.map(expense => [
      expense.date,
      expense.category,
      expense.description,
      `$${expense.amount.toFixed(2)}`
    ]);

    autoTable(doc, {
      head: [['Date', 'Category', 'Description', 'Amount']],
      body: tableData,
      startY: 45,
      theme: 'grid',
      styles: {
        fontSize: 10,
        cellPadding: 5,
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

    const totalAmount = mockExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const finalY = (doc as any).lastAutoTable.finalY || 45;
    
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text(`Total Expenses: $${totalAmount.toFixed(2)}`, 20, finalY + 20);

    doc.save('expenses.pdf');

    setNotification({
      isVisible: true,
      type: 'success',
      title: 'PDF Export Successful!',
      message: `Downloaded PDF report with ${mockExpenses.length} expense records.`,
    });
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.7 }}
      className="card p-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Export Data
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Download your expense data for external analysis or record keeping.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={exportToCSV}
          className="flex items-center justify-center space-x-2 bg-success-500 hover:bg-success-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg"
        >
          <Download size={20} />
          <span>Export as CSV</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={exportToPDF}
          className="flex items-center justify-center space-x-2 bg-danger-500 hover:bg-danger-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg"
        >
          <FileText size={20} />
          <span>Export as PDF</span>
        </motion.button>
      </div>

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
