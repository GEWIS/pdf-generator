import LetterService, { References } from './letterService';
import { ApiError, HTTPStatus } from '../helpers/customError';
import { InvoiceType } from '../controllers/invoiceController';
import asyncFileSystem from 'fs/promises';
import { replaceAll } from '../helpers/replaceAll';
import finishFileGeneration, { FileSettings, Stationery } from '../helpers/fileManager';
import path from 'path';
import createPricingTable, { Product } from '../helpers/componentGenerator';
import { QuoteParameters } from './contractService';
import { ValidateError } from 'tsoa';

export interface InvoiceReferences extends References {
  costCenter?: boolean;
}

export interface InvoiceParameters extends Omit<QuoteParameters, 'reference'> {
  summarizedProducts?: Product[];
  reference?: InvoiceReferences;
  description?: string;
}

export default class InvoiceService {
  private readonly templateDir: string;

  private readonly stationeryDirGEWIS: string;

  private readonly stationeryDirBAC: string;

  private readonly invoiceName: string;

  private readonly invoiceNameWeekly: string;

  private readonly workDir: string;

  constructor() {
    if (
      !process.env.TEMPLATE_DIR ||
      !process.env.STATIONERY_DIR_GEWIS ||
      !process.env.STATIONERY_DIR_BAC ||
      !process.env.INVOICE_NAME ||
      !process.env.INVOICE_NAME_WEEKLY ||
      !process.env.WORK_DIR
    )
      throw new ApiError(
        HTTPStatus.InternalServerError,
        'One or more environment variables has not been set'
      );

    this.templateDir = process.env.TEMPLATE_DIR;
    this.stationeryDirGEWIS = process.env.STATIONERY_DIR_GEWIS;
    this.stationeryDirBAC = process.env.STATIONERY_DIR_BAC;
    this.invoiceName = process.env.INVOICE_NAME;
    this.invoiceNameWeekly = process.env.INVOICE_NAME_WEEKLY;
    this.workDir = process.env.WORK_DIR;
  }

  /**
   * Generate a file based on an invoice. Can be a standard invoice, or a weekly sales invoice / creditnota
   * @param settings {FileSettings} The corresponding generation settings
   * @param parameters {InvoiceParameters} The parameters used for generating the invoice
   * @param type {InvoiceType} The type of the invoice
   * @param letterService {LetterService} Service for filling out letter
   */
  public async generateInvoice(
    settings: FileSettings,
    parameters: InvoiceParameters,
    type: InvoiceType,
    letterService: LetterService
  ): Promise<string> {
    // Read template file
    let fileBuffer: Buffer | void = await asyncFileSystem
      .readFile(
        path.join(
          this.templateDir,
          type === InvoiceType.WEEKLYSALES ? this.invoiceNameWeekly : this.invoiceName
        )
      )
      .catch((e: Error): void => {
        throw new ApiError(
          HTTPStatus.InternalServerError,
          'Template files for invoice are (temporarily) missing. \n\n' + e
        );
      });
    let invoice: string = fileBuffer!.toString();

    invoice = letterService.generateBaseTexLetter(
      invoice,
      settings.language,
      parameters.subject,
      parameters.sender,
      parameters.recipient,
      parameters.company,
      parameters.dates,
      parameters.address,
      parameters.reference
    );

    invoice = replaceAll(
      invoice,
      '{{periodstart}}',
      parameters.dates.startDate ? parameters.dates.startDate.toLocaleDateString('nl-NL') : 'nil'
    );
    invoice = replaceAll(
      invoice,
      '{{periodend}}',
      parameters.dates.endDate
        ? parameters.dates.endDate.toLocaleDateString('nl-NL')
        : parameters.dates.date.toLocaleDateString('nl-NL')
    );

    invoice = replaceAll(invoice, '{{description}}', parameters.description ?? '');

    invoice = createPricingTable(invoice, parameters.products, parameters.pricing);

    if (type === InvoiceType.WEEKLYSALES) {
      // Add extra summarized product table
      if (parameters.summarizedProducts) {
        invoice = createPricingTable(
          invoice,
          parameters.summarizedProducts,
          parameters.pricing,
          'summaryentries'
        );
      } else {
        throw new ValidateError(
          {
            'params.params.summarizedProducts': {
              message: "'summarizedProducts' is required (for weekly sales)"
            }
          },
          "'summarizedProducts' is required (for weekly sales)"
        );
      }
    } else if (type === InvoiceType.CREDIT) {
      // Also possible to add costCenter or creditnota
      invoice = replaceAll(invoice, '{{extraoptions}}', 'credit');
    } else if (parameters.reference?.costCenter) {
      invoice = replaceAll(invoice, '{{extraoptions}}', 'costcenter');
    }

    return finishFileGeneration(
      invoice,
      settings.fileType,
      this.workDir,
      settings.stationery === Stationery.GEWIS ? this.stationeryDirGEWIS : this.stationeryDirBAC
    );
  }
}
