// Philippine Peso currency formatting utilities

export const CURRENCY_SYMBOL = '₱';
export const CURRENCY_CODE = 'PHP';

/**
 * Format a number as Philippine Peso currency
 * @param amount - The amount to format
 * @param showSymbol - Whether to show the peso symbol (default: true)
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, showSymbol: boolean = true): string {
  const formatted = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: CURRENCY_CODE,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  if (!showSymbol) {
    return formatted.replace('₱', '').trim();
  }

  return formatted;
}

/**
 * Format amount with peso symbol only (no full currency formatting)
 * @param amount - The amount to format
 * @returns Simple peso formatted string
 */
export function formatPeso(amount: number): string {
  return `₱${amount.toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Parse peso string back to number
 * @param pesoString - String like "₱1,234.56"
 * @returns Number value
 */
export function parsePeso(pesoString: string): number {
  return parseFloat(pesoString.replace(/[₱,]/g, '')) || 0;
}

/**
 * Get currency symbol
 * @returns Philippine peso symbol
 */
export function getCurrencySymbol(): string {
  return CURRENCY_SYMBOL;
}
