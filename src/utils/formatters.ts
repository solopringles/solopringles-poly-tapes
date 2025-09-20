// /src/utils/formatters.ts --- UPDATED

export const formatCurrency = (value: number | null | undefined): string => {
  if (value === null || typeof value === 'undefined') {
    return '$0';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatScore = (value: number | null | undefined): string => {
  if (value === null || typeof value === 'undefined') {
    return 'N/A';
  }
  return value.toFixed(1);
};


/**
 * Formats a decimal number into a signed percentage string.
 * e.g., 0.0523 -> +5.23%, -0.01 -> -1.00%
 */
export const formatPercent = (num: number | null | undefined): string => {
  if (num === null || typeof num === 'undefined') return '—';
  if (num === 0) return '0.00%';
  const percentage = num * 100;
  const sign = percentage > 0 ? '+' : '';
  return `${sign}${percentage.toFixed(2)}%`;
};