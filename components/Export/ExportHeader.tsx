'use client';

import { motion } from 'framer-motion';

export default function ExportHeader() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="mb-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Export Data
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Download your expense data in various formats for analysis or record keeping
        </p>
      </div>
    </motion.div>
  );
}
