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
export function formatNum({
  num,
  precision,
  currencySymbol,
}: {
  num: number;
  precision?: number;
  currencySymbol?: string;
}): string {
  if (Number.isNaN(num)) {
    return '';
  }

  const fixedNum = precision ? +num.toFixed(precision) : num;
  const formattedNum = formatter.format(fixedNum);

  if (currencySymbol) {
    return `${formattedNum} ${currencySymbol}`;
  }

  return formattedNum;
}
