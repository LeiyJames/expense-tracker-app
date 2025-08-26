import { Expense, Category, Budget } from '../data/mockData';

const STORAGE_KEYS = {
  EXPENSES: 'expense-tracker-expenses',
  CATEGORIES: 'expense-tracker-categories',
  BUDGETS: 'expense-tracker-budgets'
} as const;

export function saveToLocalStorage<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
}

export function saveExpenses(expenses: Expense[]): void {
  saveToLocalStorage(STORAGE_KEYS.EXPENSES, expenses);
}

export function loadExpenses(defaultExpenses: Expense[]): Expense[] {
  return loadFromLocalStorage(STORAGE_KEYS.EXPENSES, defaultExpenses);
}

export function saveCategories(categories: Category[]): void {
  saveToLocalStorage(STORAGE_KEYS.CATEGORIES, categories);
}

export function loadCategories(defaultCategories: Category[]): Category[] {
  return loadFromLocalStorage(STORAGE_KEYS.CATEGORIES, defaultCategories);
}

export function saveBudgets(budgets: Budget[]): void {
  saveToLocalStorage(STORAGE_KEYS.BUDGETS, budgets);
}

export function loadBudgets(defaultBudgets: Budget[]): Budget[] {
  return loadFromLocalStorage(STORAGE_KEYS.BUDGETS, defaultBudgets);
}
