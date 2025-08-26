'use client';

import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';
import { useState } from 'react';

export default function AnalyticsHeader() {
  const [dateRange, setDateRange] = useState('Last 3 months');

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="mb-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Detailed insights into your spending patterns
          </p>
        </div>

        <div className="relative">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="input pr-10 appearance-none cursor-pointer"
          >
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last 6 months</option>
            <option>Last year</option>
            <option>Custom range</option>
          </select>
          <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
    </motion.div>
  );
}
