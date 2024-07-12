import { Body, Controller, Post, Produces, Response, Route, SuccessResponse, Tags } from 'tsoa';
import { FileSettings, prepareFileResponse } from '../helpers/fileManager';
import { ApiError, HTTPStatus, InternalError, ValidateErrorJSON } from '../helpers/customError';
import LetterService from '../services/letterService';
import InvoiceService, { InvoiceParameters } from '../services/invoiceService';

export enum InvoiceType {
  INVOICE = 'invoice',
  WEEKLYSALES = 'weeklysales',
  CREDIT = 'creditnota'
}

export interface InvoiceRouteParams {
  params: InvoiceParameters;
  settings: FileSettings;
}

@Route('invoice')
@Produces('application/pdf+tex')
@Tags('Invoice')
export class InvoiceController extends Controller {
  /**
   * Generates an invoice as Tex of PDF file.
   * Supply all invoice parameters and invoice type and receive the corresponding invoice
   */
  @Post('{type}')
  @Response<ValidateErrorJSON>(422, 'Validation Failed')
  @Response<InternalError>(500, 'Internal Server Error')
  @SuccessResponse(200, 'Ok')
  public async generateInvoice(
    type: InvoiceType,
    @Body() params: InvoiceRouteParams
  ): Promise<any> {
    let letterService: LetterService = new LetterService();
    let fileName: string = await new InvoiceService().generateInvoice(
      params.settings,
      params.params,
      type,
      letterService
    );
    if (fileName === undefined)
      throw new ApiError(
        HTTPStatus.InternalServerError,
        'Something went wrong when generating an invoice. No file was generated.'
      );
    return prepareFileResponse(this, fileName);
  }
}
