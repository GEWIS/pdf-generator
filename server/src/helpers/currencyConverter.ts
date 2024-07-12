/**
 * Convert number to currency (Euros)
 * @param price {number} number to convert to currency
 */
export default function convertNumberToCurrency(price: number): string {
  return new Intl.NumberFormat('nl-NL', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(price / 100);
}
