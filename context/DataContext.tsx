import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Expense, Category, Budget, mockExpenses, mockCategories, defaultBudgets } from '../data/mockData';
import { saveExpenses, loadExpenses, saveCategories, loadCategories, saveBudgets, loadBudgets } from '../lib/localStorage';

interface DataContextType {
  expenses: Expense[];
  categories: Category[];
  budgets: Budget[];
  addExpense: (expense: Expense) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  addBudget: (budget: Budget) => void;
  updateBudget: (budget: Budget) => void;
  deleteBudget: (id: string) => void;
  getBudgetProgress: (type: 'daily' | 'weekly' | 'monthly', category?: string) => {
    spent: number;
    limit: number;
    percentage: number;
    remaining: number;
  };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const loadedExpenses = loadExpenses(mockExpenses);
    const loadedCategories = loadCategories(mockCategories);
    const loadedBudgets = loadBudgets(defaultBudgets);
    
    setExpenses(loadedExpenses);
    setCategories(loadedCategories);
    setBudgets(loadedBudgets);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      saveExpenses(expenses);
    }
  }, [expenses, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      saveCategories(categories);
    }
  }, [categories, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      saveBudgets(budgets);
    }
  }, [budgets, isInitialized]);

  const addExpense = (expense: Expense) => {
    setExpenses(prev => [...prev, expense]);
  };

  const updateExpense = (updatedExpense: Expense) => {
    setExpenses(prev => 
      prev.map(expense => 
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const addCategory = (category: Category) => {
    setCategories(prev => [...prev, category]);
  };

  const updateCategory = (updatedCategory: Category) => {
    setCategories(prev => 
      prev.map(category => 
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(category => category.id !== id));
  };

  const addBudget = (budget: Budget) => {
    setBudgets(prev => [...prev, budget]);
  };

  const updateBudget = (updatedBudget: Budget) => {
    setBudgets(prev => 
      prev.map(budget => 
        budget.id === updatedBudget.id ? updatedBudget : budget
      )
    );
  };

  const deleteBudget = (id: string) => {
    setBudgets(prev => prev.filter(budget => budget.id !== id));
  };

  const getBudgetProgress = (type: 'daily' | 'weekly' | 'monthly', category?: string) => {
    const budget = budgets.find(b => b.type === type && b.isActive && b.category === category);
    const limit = budget?.amount || 0;

    if (limit === 0) {
      return { spent: 0, limit: 0, percentage: 0, remaining: 0 };
    }

    const now = new Date();
    let startDate: Date;
    
    switch (type) {
      case 'daily':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'weekly':
        const dayOfWeek = now.getDay();
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek);
        break;
      case 'monthly':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      default:
        startDate = new Date();
    }

    const spent = expenses
      .filter(expense => {
        const expenseDate = new Date(expense.date);
        const matchesTimeFrame = expenseDate >= startDate && expenseDate <= now;
        const matchesCategory = category ? expense.category === category : true;
        return matchesTimeFrame && matchesCategory;
      })
      .reduce((sum, expense) => sum + expense.amount, 0);

    const percentage = limit > 0 ? (spent / limit) * 100 : 0;
    const remaining = Math.max(0, limit - spent);

    return { spent, limit, percentage, remaining };
  };

  const value: DataContextType = {
    expenses,
    categories,
    budgets,
    addExpense,
    updateExpense,
    deleteExpense,
    addCategory,
    updateCategory,
    deleteCategory,
    addBudget,
    updateBudget,
    deleteBudget,
    getBudgetProgress
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
