// /src/utils/formatters.ts --- REVISED

/**
 * Formats a number into a USD currency string.
 * @param value The number to format.
 * @param digits The number of decimal places to display. Defaults to 0.
 */
export const formatCurrency = (value: number | null | undefined, digits: number = 0): string => {
  // Return a default value like '$0.00' or '$0' if input is null/undefined
  if (value === null || typeof value === 'undefined') {
    return `$0${digits > 0 ? '.' + '0'.repeat(digits) : ''}`;
  }

  // Use Intl.NumberFormat for robust, localized currency formatting
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits, // Ensure it's exactly 'digits' decimal places
  }).format(value);
};

/**
 * Formats a number into a score with one decimal place.
 * @param value The score to format.
 */
export const formatScore = (value: number | null | undefined): string => {
  if (value === null || typeof value === 'undefined' || isNaN(value)) {
    return 'N/A';
  }
  return value.toFixed(1);
};


/**
 * Formats a decimal number into a signed percentage string.
 * e.g., 0.0523 -> +5.23%, -0.01 -> -1.00%
 * @param num The decimal number to format.
 */
export const formatPercent = (num: number | null | undefined): string => {
  if (num === null || typeof num === 'undefined' || isNaN(num)) return '—';
  if (num === 0) return '0.00%';
  
  const percentage = num * 100;
  const sign = percentage > 0 ? '+' : '';
  
  return `${sign}${percentage.toFixed(2)}%`;
};