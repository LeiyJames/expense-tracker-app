'use client';

import { motion } from 'framer-motion';
import { BarChart3, CreditCard, Download, Home, Tags } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: CreditCard, label: 'Expenses', href: '/expenses' },
  { icon: Tags, label: 'Categories', href: '/categories' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: Download, label: 'Export', href: '/export' },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full"
    >
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = router.pathname === item.href;
            
            return (
              <Link key={item.label} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-primary text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 p-4 bg-gradient-to-br from-primary-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Upgrade to Pro</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Get unlimited categories and advanced analytics
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-primary text-white py-2 rounded-lg text-sm font-medium"
          >
            Upgrade Now
          </motion.button>
        </div>
      </div>
    </motion.aside>
  );
}
