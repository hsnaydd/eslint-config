const DEFAULT_LOCALE = 'en-US';

export function formatPrice(amount, currency = 'USD') {
  return new Intl.NumberFormat(DEFAULT_LOCALE, { style: 'currency', currency }).format(amount);
}

export function sum(values) {
  return values.reduce((total, value) => total + value, 0);
}
