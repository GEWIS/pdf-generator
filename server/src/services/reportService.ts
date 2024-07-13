import { ApiError, HTTPStatus } from '../helpers/customError';
import asyncFileSystem from 'fs/promises';
import { replaceAll } from '../helpers/replaceAll';
import finishFileGeneration, { FileSettings, Stationery } from '../helpers/fileManager';
import path from 'path';
import createPricingTable, { Product, TotalPricing } from '../helpers/componentGenerator';

export interface FineReportParameters {
  startDate: Date;
  endDate: Date;
  fines: Product[];
  total: TotalPricing;
}
export default class ReportService {
  private readonly templateDir: string;

  private readonly stationeryDirGEWIS: string;

  private readonly stationeryDirBAC: string;

  private readonly fineReportName: string;

  private readonly workDir: string;

  constructor() {
    if (
      !process.env.TEMPLATE_DIR ||
      !process.env.STATIONERY_DIR_GEWIS ||
      !process.env.STATIONERY_DIR_BAC ||
      !process.env.FINE_REPORT_NAME ||
      !process.env.WORK_DIR
    )
      throw new ApiError(
        HTTPStatus.InternalServerError,
        'One or more environment variables has not been set'
      );

    this.templateDir = process.env.TEMPLATE_DIR;
    this.stationeryDirGEWIS = process.env.STATIONERY_DIR_GEWIS;
    this.stationeryDirBAC = process.env.STATIONERY_DIR_BAC;
    this.fineReportName = process.env.FINE_REPORT_NAME;
    this.workDir = process.env.WORK_DIR;
  }

  /**
   * Generate a report based on fine data.
   * @param settings {FileSettings} The corresponding generation settings
   * @param parameters {FineReportParameters} The parameters used for generating the report
   */
  public async generateFineReport(
    settings: FileSettings,
    parameters: FineReportParameters,
  ): Promise<string> {
    // Read template file
    let fileBuffer: Buffer | void = await asyncFileSystem
      .readFile(
        path.join(
          this.templateDir,
          this.fineReportName
        )
      )
      .catch((e: Error): void => {
        throw new ApiError(
          HTTPStatus.InternalServerError,
          'Template files for reports are (temporarily) missing. \n\n' + e
        );
      });
    let report: string = fileBuffer!.toString();

    report = replaceAll(
      report,
      '{{periodstart}}',
      parameters.startDate.toLocaleDateString('nl-NL')
    );
    report = replaceAll(
      report,
      '{{periodend}}',
      parameters.endDate.toLocaleDateString('nl-NL')
    );

    const { startDate, endDate } = parameters;
    report = replaceAll(report, '{{startdateday}}', startDate.getDate().toString());
    report = replaceAll(report, '{{startdatemonth}}', (startDate.getMonth() + 1).toString());
    report = replaceAll(report, '{{startdateyear}}', startDate.getFullYear().toString());

    report = replaceAll(report, '{{enddateday}}', endDate.getDate().toString());
    report = replaceAll(report, '{{enddatemonth}}', (endDate.getMonth() + 1).toString());
    report = replaceAll(report, '{{enddateyear}}', endDate.getFullYear().toString());

    report = createPricingTable(report, parameters.fines, parameters.total, 'fines');

    return finishFileGeneration(
      report,
      settings.fileType,
      this.workDir,
      settings.stationery === Stationery.GEWIS ? this.stationeryDirGEWIS : this.stationeryDirBAC
    );
  }
}
