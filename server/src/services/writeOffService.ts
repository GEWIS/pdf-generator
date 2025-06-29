import { ApiError, HTTPStatus } from '../helpers/customError';
import finishFileGeneration, { FileSettings, Stationery } from '../helpers/fileManager';
import asyncFileSystem from 'fs/promises';
import path from 'path';
import { replaceAll } from '../helpers/replaceAll';
import { createWriteOffEntry, WriteOff } from '../helpers/componentGenerator';

export interface WriteOffParameters {
  writeOff: WriteOff;
}

export default class WriteOffService {
  private readonly templateDir: string;

  private readonly stationeryDirGEWIS: string;

  private readonly stationeryDirBAC: string;

  private readonly writeOffName: string;

  private readonly workDir: string;

  constructor() {
    if (
      !process.env.TEMPLATE_DIR ||
      !process.env.STATIONERY_DIR_GEWIS ||
      !process.env.STATIONERY_DIR_BAC ||
      !process.env.WRITE_OFF_NAME ||
      !process.env.WORK_DIR
    )
      throw new ApiError(
        HTTPStatus.InternalServerError,
        'One or more environment variables has not been set'
      );

    this.templateDir = process.env.TEMPLATE_DIR;
    this.stationeryDirGEWIS = process.env.STATIONERY_DIR_GEWIS;
    this.stationeryDirBAC = process.env.STATIONERY_DIR_BAC;
    this.writeOffName = process.env.WRITE_OFF_NAME;
    this.workDir = process.env.WORK_DIR;
  }

  /**
   * Generate a file based on a write-off.
   * @param settings {FileSettings} The corresponding generation settings
   * @param parameters {} The parameters used for generating the payout
   */
  public async generateWriteOff(
    settings: FileSettings,
    parameters: WriteOffParameters
  ): Promise<string> {
    // Read template file
    let fileBuffer: Buffer | void = await asyncFileSystem
      .readFile(path.join(this.templateDir, this.writeOffName))
      .catch((e: Error): void => {
        throw new ApiError(
          HTTPStatus.InternalServerError,
          'Template files for payouts are (temporarily) missing. \n\n' + e
        );
      });
    let payout: string = fileBuffer!.toString();

    payout = replaceAll(payout, '{{ourreference}}', parameters.writeOff.reference);
    payout = replaceAll(payout, '{{debtornumber}}', parameters.writeOff.debtorNumber);
    payout = replaceAll(payout, '{{dateday}}', parameters.writeOff.date.getDate().toString());
    payout = replaceAll(
      payout,
      '{{datemonth}}',
      (parameters.writeOff.date.getMonth() + 1).toString()
    );
    payout = replaceAll(payout, '{{dateyear}}', parameters.writeOff.date.getFullYear().toString());
    payout = createWriteOffEntry(payout, parameters.writeOff);

    return finishFileGeneration(
      payout,
      settings.fileType,
      this.workDir,
      settings.stationery === Stationery.GEWIS ? this.stationeryDirGEWIS : this.stationeryDirBAC
    );
  }
}
