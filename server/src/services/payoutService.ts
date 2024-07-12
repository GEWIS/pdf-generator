import { ApiError, HTTPStatus } from '../helpers/customError';
import asyncFileSystem from 'fs/promises';
import { replaceAll } from '../helpers/replaceAll';
import finishFileGeneration, { FileSettings, Stationery } from '../helpers/fileManager';
import path from 'path';
import { createPayoutEntry, Payout } from '../helpers/componentGenerator';

export interface PayoutParameters {
  payout: Payout;
}
export default class PayoutService {
  private readonly templateDir: string;

  private readonly stationeryDirGEWIS: string;

  private readonly stationeryDirBAC: string;

  private readonly payoutName: string;

  private readonly workDir: string;

  constructor() {
    if (
      !process.env.TEMPLATE_DIR ||
      !process.env.STATIONERY_DIR_GEWIS ||
      !process.env.STATIONERY_DIR_BAC ||
      !process.env.PAYOUT_NAME ||
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
    this.workDir = process.env.WORK_DIR;
  }

  /**
   * Generate a file based on a payout.
   * @param settings {FileSettings} The corresponding generation settings
   * @param parameters {InvoiceParameters} The parameters used for generating the payout
   */
  public async generatePayout(
    settings: FileSettings,
    parameters: PayoutParameters,
  ): Promise<string> {
    // Read template file
    let fileBuffer: Buffer | void = await asyncFileSystem
      .readFile(
        path.join(
          this.templateDir,
          this.payoutName
        )
      )
      .catch((e: Error): void => {
        throw new ApiError(
          HTTPStatus.InternalServerError,
          'Template files for payouts are (temporarily) missing. \n\n' + e
        );
      });
    let payout: string = fileBuffer!.toString();

    payout = replaceAll(payout,  '{{IBAN}}', parameters.payout.bankAccountNumber);
    payout = replaceAll(payout,  '{{ourreference}}', parameters.payout.reference);
    payout = replaceAll(payout,  '{{debtornumber}}', parameters.payout.debtorNumber);
    payout = replaceAll(payout,  '{{dateday}}', parameters.payout.date.getDate().toString());
    payout = replaceAll(payout,  '{{datemonth}}', (parameters.payout.date.getMonth() + 1).toString());
    payout = replaceAll(payout,  '{{dateyear}}', parameters.payout.date.getFullYear().toString());
    payout = createPayoutEntry(payout, parameters.payout);


    return finishFileGeneration(
      payout,
      settings.fileType,
      this.workDir,
      settings.stationery === Stationery.GEWIS ? this.stationeryDirGEWIS : this.stationeryDirBAC
    );
  }
}
