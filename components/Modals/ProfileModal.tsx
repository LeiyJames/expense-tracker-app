'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Settings, 
  Bell,
  Shield,
  Camera,
  Edit3
} from 'lucide-react';
import { useState } from 'react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  plan: string;
  avatar: string;
  totalExpenses: number;
  monthlyBudget: number;
  categoriesUsed: number;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const [activeTab, setActiveTab] = useState('profile');
  
  const userProfile: UserProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: '2023-01-15',
    plan: 'Premium',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    totalExpenses: 2847.32,
    monthlyBudget: 4500,
    categoriesUsed: 6,
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                  {userProfile.avatar ? (
                    <img src={userProfile.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    userProfile.name.charAt(0)
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-lg"
                >
                  <Camera size={16} />
                </motion.button>
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                {userProfile.name}
              </h3>
              <p className="text-primary-600 font-medium">{userProfile.plan} Member</p>
            </div>

            {/* Profile Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700">
                <Mail className="text-gray-500" size={20} />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="font-medium text-gray-900 dark:text-white">{userProfile.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700">
                <Phone className="text-gray-500" size={20} />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                  <p className="font-medium text-gray-900 dark:text-white">{userProfile.phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700">
                <MapPin className="text-gray-500" size={20} />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                  <p className="font-medium text-gray-900 dark:text-white">{userProfile.location}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700">
                <Calendar className="text-gray-500" size={20} />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(userProfile.joinDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 rounded-xl bg-primary-50 dark:bg-primary-900">
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  ${userProfile.totalExpenses.toFixed(0)}
                </p>
                <p className="text-xs text-primary-600 dark:text-primary-400">Total Expenses</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-success-50 dark:bg-success-900">
                <p className="text-2xl font-bold text-success-600 dark:text-success-400">
                  ${userProfile.monthlyBudget}
                </p>
                <p className="text-xs text-success-600 dark:text-success-400">Monthly Budget</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900">
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {userProfile.categoriesUsed}
                </p>
                <p className="text-xs text-indigo-600 dark:text-indigo-400">Categories</p>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">Preferences</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700">
                <span className="text-gray-900 dark:text-white">Dark Mode</span>
                <button className="w-12 h-6 bg-primary-600 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                </button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700">
                <span className="text-gray-900 dark:text-white">Auto-categorize</span>
                <button className="w-12 h-6 bg-gray-300 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                </button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700">
                <span className="text-gray-900 dark:text-white">Weekly Reports</span>
                <button className="w-12 h-6 bg-primary-600 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                </button>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">Notification Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700">
                <div>
                  <p className="text-gray-900 dark:text-white font-medium">Budget Alerts</p>
                  <p className="text-sm text-gray-500">Get notified when approaching budget limits</p>
                </div>
                <button className="w-12 h-6 bg-primary-600 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                </button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700">
                <div>
                  <p className="text-gray-900 dark:text-white font-medium">Monthly Reports</p>
                  <p className="text-sm text-gray-500">Receive monthly spending summaries</p>
                </div>
                <button className="w-12 h-6 bg-primary-600 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                </button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700">
                <div>
                  <p className="text-gray-900 dark:text-white font-medium">Goal Reminders</p>
                  <p className="text-sm text-gray-500">Reminders for savings goals</p>
                </div>
                <button className="w-12 h-6 bg-gray-300 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                </button>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">Security Settings</h4>
            <div className="space-y-3">
              <button className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <p className="text-gray-900 dark:text-white font-medium">Change Password</p>
                <p className="text-sm text-gray-500">Update your account password</p>
              </button>
              <button className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <p className="text-gray-900 dark:text-white font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">Add an extra layer of security</p>
              </button>
              <button className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <p className="text-gray-900 dark:text-white font-medium">Connected Accounts</p>
                <p className="text-sm text-gray-500">Manage linked bank accounts</p>
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl mx-auto max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Profile & Settings
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg"
              >
                <X size={24} />
              </motion.button>
            </div>

            <div className="flex">
              {/* Sidebar Tabs */}
              <div className="w-48 border-r border-gray-200 dark:border-gray-700 p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <motion.button
                        key={tab.id}
                        whileHover={{ x: 4 }}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all ${
                          activeTab === tab.id
                            ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <Icon size={18} />
                        <span className="text-sm font-medium">{tab.label}</span>
                      </motion.button>
                    );
                  })}
                </nav>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 overflow-y-auto max-h-[calc(90vh-5rem)]">
                {renderTabContent()}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
