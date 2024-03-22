const LOCALE = 'en-US';
const formatter = new Intl.NumberFormat(LOCALE);

/**
 * @description Format number to thousands separator
 * @param {number} num
 * @param {number} precision
 * @returns {string}
 * @example
 * numFormat(1234567.89); // 1,234,567.89
 */
export function formatNum(num: number, precision?: number): string {
  const fixedNum = precision ? +num.toFixed(precision) : num;
  return formatter.format(fixedNum);
}
