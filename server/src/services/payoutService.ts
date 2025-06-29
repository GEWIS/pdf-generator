import { ApiError, HTTPStatus } from '../helpers/customError';
import asyncFileSystem from 'fs/promises';
import { replaceAll, replaceAllSafe } from '../helpers/replaceAll';
import finishFileGeneration, { FileSettings, Stationery } from '../helpers/fileManager';
import path from 'path';
import createPricingTable, {
  createPayoutEntry,
  createSellerPayoutEntry,
  Payout,
  Product,
  TotalPricing
} from '../helpers/componentGenerator';
import { Identity } from './letterService';
import convertNumberToCurrency from '../helpers/currencyConverter';

export interface PayoutParameters {
  payout: Payout;
}

export interface SellerPayoutParameters {
  startDate: Date;
  endDate: Date;
  entries: Product[];
  total: TotalPricing;
  description: string;
  reference: string;
  debtorId: number;
  account: Identity;
}

export default class PayoutService {
  private readonly templateDir: string;

  private readonly stationeryDirGEWIS: string;

  private readonly stationeryDirBAC: string;

  private readonly payoutName: string;

  private readonly disbursementName: string;

  private readonly workDir: string;

  constructor() {
    if (
      !process.env.TEMPLATE_DIR ||
      !process.env.STATIONERY_DIR_GEWIS ||
      !process.env.STATIONERY_DIR_BAC ||
      !process.env.PAYOUT_NAME ||
      !process.env.DISBURSEMENT_NAME ||
      !process.env.WORK_DIR
    )
      throw new ApiError(
        HTTPStatus.InternalServerError,
        'One or more environment variables has not been set'
      );

    this.templateDir = process.env.TEMPLATE_DIR;
    this.stationeryDirGEWIS = process.env.STATIONERY_DIR_GEWIS;
    this.stationeryDirBAC = process.env.STATIONERY_DIR_BAC;
    this.payoutName = process.env.PAYOUT_NAME;
    this.disbursementName = process.env.DISBURSEMENT_NAME;
    this.workDir = process.env.WORK_DIR;
  }

  /**
   * Generate a file based on a payout.
   * @param settings {FileSettings} The corresponding generation settings
   * @param parameters {InvoiceParameters} The parameters used for generating the payout
   */
  public async generatePayout(
    settings: FileSettings,
    parameters: PayoutParameters
  ): Promise<string> {
    // Read template file
    let fileBuffer: Buffer | void = await asyncFileSystem
      .readFile(path.join(this.templateDir, this.payoutName))
      .catch((e: Error): void => {
        throw new ApiError(
          HTTPStatus.InternalServerError,
          'Template files for payouts are (temporarily) missing. \n\n' + e
        );
      });
    let payout: string = fileBuffer!.toString();

    payout = replaceAll(payout, '{{IBAN}}', parameters.payout.bankAccountNumber);
    payout = replaceAll(payout, '{{ourreference}}', parameters.payout.reference);
    payout = replaceAll(payout, '{{debtornumber}}', parameters.payout.debtorNumber);
    payout = replaceAll(payout, '{{dateday}}', parameters.payout.date.getDate().toString());
    payout = replaceAll(
      payout,
      '{{datemonth}}',
      (parameters.payout.date.getMonth() + 1).toString()
    );
    payout = replaceAll(payout, '{{dateyear}}', parameters.payout.date.getFullYear().toString());
    payout = createPayoutEntry(payout, parameters.payout);

    return finishFileGeneration(
      payout,
      settings.fileType,
      this.workDir,
      settings.stationery === Stationery.GEWIS ? this.stationeryDirGEWIS : this.stationeryDirBAC
    );
  }

  public async generateDisbursement(
    settings: FileSettings,
    parameters: SellerPayoutParameters
  ): Promise<string> {
    // Read template file
    let fileBuffer: Buffer | void = await asyncFileSystem
      .readFile(path.join(this.templateDir, this.disbursementName))
      .catch((e: Error): void => {
        throw new ApiError(
          HTTPStatus.InternalServerError,
          'Template files for payouts are (temporarily) missing. \n\n' + e
        );
      });
    let payout: string = fileBuffer!.toString();

    payout = replaceAllSafe(payout, '{{company}}', parameters.account.firstName);
    payout = replaceAll(payout, '{{description}}', parameters.description);
    payout = replaceAll(payout, '{{ourreference}}', parameters.reference);
    payout = replaceAll(payout, '{{debtornumber}}', parameters.debtorId.toString());
    const safeUserName: string = parameters.account.fullName.replace(/([&%$#_{}])/g, '\\$1');
    payout = createSellerPayoutEntry(
      payout,
      parameters.total.inclVat,
      safeUserName,
      parameters.reference
    );

    payout = replaceAll(payout, '{{dateday}}', parameters.startDate.getDate().toString());
    payout = replaceAll(payout, '{{datemonth}}', (parameters.startDate.getMonth() + 1).toString());
    payout = replaceAll(payout, '{{dateyear}}', parameters.startDate.getFullYear().toString());

    payout = replaceAll(payout, '{{dueday}}', parameters.endDate.getDate().toString());
    payout = replaceAll(payout, '{{duemonth}}', (parameters.endDate.getMonth() + 1).toString());
    payout = replaceAll(payout, '{{dueyear}}', parameters.endDate.getFullYear().toString());

    payout = replaceAll(payout, '{{inclvat}}', convertNumberToCurrency(parameters.total.inclVat));
    payout = replaceAll(payout, '{{exclvat}}', convertNumberToCurrency(parameters.total.exclVat));
    payout = replaceAll(payout, '{{vatlow}}', convertNumberToCurrency(parameters.total.lowVat));
    payout = replaceAll(payout, '{{vathigh}}', convertNumberToCurrency(parameters.total.highVat));
    payout = replaceAll(
      payout,
      '{{totalvat}}',
      convertNumberToCurrency(parameters.total.inclVat - parameters.total.exclVat)
    );

    payout = replaceAll(
      payout,
      '{{periodstart}}',
      parameters.startDate.toISOString().substring(0, 10)
    );
    payout = replaceAll(payout, '{{periodend}}', parameters.endDate.toISOString().substring(0, 10));

    payout = createPricingTable(payout, parameters.entries, parameters.total, 'sales');

    return finishFileGeneration(
      payout,
      settings.fileType,
      this.workDir,
      settings.stationery === Stationery.GEWIS ? this.stationeryDirGEWIS : this.stationeryDirBAC
    );
  }
}
