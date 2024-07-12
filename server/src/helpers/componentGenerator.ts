import convertNumberToCurrency from './currencyConverter';
import { replaceAll } from './replaceAll';

export interface ProductPricing {
  basePrice: number;
  discount?: number;
  vatAmount: number;
  vatCategory: VAT;
  quantity: number;
}

export interface Product {
  name: string;
  details?: string;
  summary: string;
  specification?: string;
  pricing: ProductPricing;
}

export interface TotalPricing {
  exclVat: number;
  lowVat: number;
  highVat: number;
  inclVat: number;
}

export interface Payout {
  bankAccountName: string;
  bankAccountNumber: string;
  amount: number;
  reference: string;
  date: Date;
  debtorNumber: string;
}

export enum VAT {
  ZERO = 'ZERO',
  LOW = 'LOW',
  HIGH = 'HIGH'
}

/**
 * Replace the pricing table placeholders in the .tex file with the actual pricing table
 * @param file {string} The .tex file parsed as a string
 * @param products {Array<Product>} Products for which the pricing table should be created
 * @param total {TotalPricing} Total pricing details of the provided products
 * @param replaceString {string?} Possible alternative replace string for the table
 * @returns {string} .tex file parsed as string with complete pricing table
 */
export default function createPricingTable(
  file: string,
  products: Product[],
  total: TotalPricing,
  replaceString?: string
): string {
  let invoice: string = '';
  let product: Product;

  for (let i: number = 0; i < products.length; i++) {
    product = products[i];
    invoice += `\t${product.pricing.quantity} & ${product.name} ${product.details ? `(${product.details})` : ''} & ${convertNumberToCurrency(product.pricing.basePrice)} & ${product.pricing.vatAmount}\\% & ${convertNumberToCurrency(product.pricing.basePrice)}\\\\\n`;
    if (product.pricing.discount) {
      invoice += '\t  & - \\discount ';
      invoice += `& & ${product.pricing.vatAmount}\\% & ${convertNumberToCurrency(product.pricing.discount)}\\\\\n`;
    }
  }

  file = replaceAll(file, replaceString ? `{{${replaceString}}}` : '{{invoiceentries}}', invoice);
  file = replaceAll(file, '{{exclvat}}', convertNumberToCurrency(total.exclVat));
  file = replaceAll(file, '{{vatlow}}', convertNumberToCurrency(total.lowVat));
  file = replaceAll(file, '{{vathigh}}', convertNumberToCurrency(total.highVat));
  file = replaceAll(file, '{{inclvat}}', convertNumberToCurrency(total.inclVat));
  return file;
}

/**
 * Replace the product list placeholders in the .tex file with the actual products
 * @param file {string} The .tex file parsed as a string
 * @param products {Array<Product>} Products which should be listed
 * @returns {string} .tex file parsed as string with complete product list
 */
export function createProductList(file: string, products: Product[]): string {
  let productList: string = '';
  let productInstance: Product;

  for (let i: number = 0; i < products.length; i++) {
    productInstance = products[i];
    productList += `\\item{\\textbf{${productInstance.name} ${productInstance.details ? `(${productInstance.details})` : ''}}}\\\\`;
    productList += `${productInstance.summary}`;
  }

  file = replaceAll(file, '{{productlist}}', productList);
  return file;
}

export function createPayoutEntry(file: string, payout: Payout): string {
  let payoutEntry: string = '';
  payoutEntry += `\\euro${convertNumberToCurrency(payout.amount)} & ${payout.bankAccountName} & ${payout.bankAccountNumber}\\\\\n`;
  file = replaceAll(file, '{{payoutentry}}', payoutEntry);
  return file;
}

/**
 * Replace the specification list placeholders in the .tex file with the actual specifications
 * @param file {string} The .tex file parsed as a string
 * @param products {Array<Product>} Products of which specifications should be listed
 * @returns {string} .tex file parsed as string with complete specification list, or sentence giving notice of its absence
 */
export function createSpecificationList(file: string, products: Product[]): string {
  let contractSpecifications: string = '';
  let productInstance: Product;

  // Check if there are any specifications given
  if (products.some((p: Product): boolean => p.specification === undefined)) {
    file = replaceAll(
      file,
      '{{specificationoptions}}',
      'nosep,leftmargin=0pt,labelindent=0pt,label={}'
    );
    contractSpecifications += '\n\\item\\noSpecs\\\\';
  } else {
    file = replaceAll(file, '{{specificationoptions}}', '');
  }

  for (let i: number = 0; i < products.length; i++) {
    productInstance = products[i];
    if (productInstance.specification) {
      contractSpecifications += `\n\\item{\\textbf{${productInstance.name}}}\\\\`;
      contractSpecifications += `\n${productInstance.specification}\n`;
    }
  }

  file = replaceAll(file, '{{contractspecifications}}', contractSpecifications);
  return file;
}
