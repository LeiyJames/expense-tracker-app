export interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  paymentMethod: string;
  notes?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  totalSpent: number;
  transactionCount: number;
}

export const mockExpenses: Expense[] = [
  { id: '1', date: '2024-01-15', category: 'Food & Dining', description: 'Lunch at Italian Restaurant', amount: 45.50, paymentMethod: 'Credit Card', notes: 'Business lunch with client' },
  { id: '2', date: '2024-01-15', category: 'Transportation', description: 'Uber ride to office', amount: 12.30, paymentMethod: 'Debit Card' },
  { id: '3', date: '2024-01-14', category: 'Shopping', description: 'New laptop bag', amount: 89.99, paymentMethod: 'Credit Card', notes: 'Work equipment' },
  { id: '4', date: '2024-01-14', category: 'Entertainment', description: 'Movie tickets', amount: 24.00, paymentMethod: 'Cash' },
  { id: '5', date: '2024-01-13', category: 'Food & Dining', description: 'Grocery shopping', amount: 156.78, paymentMethod: 'Debit Card', notes: 'Weekly groceries' },
  { id: '6', date: '2024-01-13', category: 'Utilities', description: 'Electricity bill', amount: 89.45, paymentMethod: 'Bank Transfer' },
  { id: '7', date: '2024-01-12', category: 'Health & Fitness', description: 'Gym membership', amount: 59.99, paymentMethod: 'Credit Card', notes: 'Monthly subscription' },
  { id: '8', date: '2024-01-12', category: 'Food & Dining', description: 'Coffee and pastry', amount: 8.75, paymentMethod: 'Cash' },
  { id: '9', date: '2024-01-11', category: 'Transportation', description: 'Gas station fill-up', amount: 52.40, paymentMethod: 'Credit Card' },
  { id: '10', date: '2024-01-11', category: 'Shopping', description: 'Winter jacket', amount: 199.99, paymentMethod: 'Credit Card', notes: 'Winter sale purchase' },
  { id: '11', date: '2024-01-10', category: 'Food & Dining', description: 'Pizza delivery', amount: 28.50, paymentMethod: 'Credit Card' },
  { id: '12', date: '2024-01-10', category: 'Entertainment', description: 'Streaming subscription', amount: 15.99, paymentMethod: 'Credit Card', notes: 'Netflix monthly' },
  { id: '13', date: '2024-01-09', category: 'Health & Fitness', description: 'Pharmacy visit', amount: 23.80, paymentMethod: 'Debit Card' },
  { id: '14', date: '2024-01-09', category: 'Transportation', description: 'Subway card refill', amount: 25.00, paymentMethod: 'Cash' },
  { id: '15', date: '2024-01-08', category: 'Utilities', description: 'Internet bill', amount: 79.99, paymentMethod: 'Bank Transfer', notes: 'Monthly internet service' },
];

export const categories = [
  'All Categories',
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Utilities',
  'Health & Fitness',
];

export const paymentMethods = [
  'All Methods',
  'Credit Card',
  'Debit Card',
  'Cash',
  'Bank Transfer',
  'PayPal',
  'Digital Wallet',
];

export const mockCategories: Category[] = [
  { id: '1', name: 'Food & Dining', icon: '🍽️', color: 'bg-blue-500', totalSpent: 240.53, transactionCount: 4 },
  { id: '2', name: 'Transportation', icon: '🚗', color: 'bg-green-500', totalSpent: 89.70, transactionCount: 3 },
  { id: '3', name: 'Shopping', icon: '🛍️', color: 'bg-purple-500', totalSpent: 289.98, transactionCount: 2 },
  { id: '4', name: 'Entertainment', icon: '🎬', color: 'bg-pink-500', totalSpent: 39.99, transactionCount: 2 },
  { id: '5', name: 'Utilities', icon: '⚡', color: 'bg-yellow-500', totalSpent: 169.44, transactionCount: 2 },
  { id: '6', name: 'Health & Fitness', icon: '💪', color: 'bg-red-500', totalSpent: 83.79, transactionCount: 2 },
];

export const chartData = {
  pieChart: {
    labels: ['Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 'Utilities', 'Health & Fitness'],
    datasets: [{
      data: [211.03, 64.70, 289.98, 24.00, 89.45, 59.99],
      backgroundColor: [
        '#3b82f6',
        '#6366f1',
        '#8b5cf6',
        '#06b6d4',
        '#10b981',
        '#f59e0b',
      ],
      borderWidth: 0,
    }],
  },
  monthlyChart: {
    labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
    datasets: [{
      label: 'Monthly Expenses',
      data: [2100, 2850, 2200, 3100, 2847],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      fill: true,
    }],
  },
};
