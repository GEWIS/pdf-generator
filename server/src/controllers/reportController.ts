import { Body, Controller, Post, Produces, Response, Route, SuccessResponse, Tags } from 'tsoa';
import { FileSettings, prepareFileResponse } from '../helpers/fileManager';
import { ApiError, HTTPStatus, InternalError, ValidateErrorJSON } from '../helpers/customError';
import ReportService, { FineReportParameters } from '../services/reportService';

export interface FineRouteParams {
  params: FineReportParameters;
  settings: FileSettings;
}

@Route('report')
@Produces('application/pdf+tex')
@Tags('Report')
export class ReportController extends Controller {
  /**
   * Generates an invoice as Tex of PDF file.
   * Supply all invoice parameters and invoice type and receive the corresponding invoice
   */
  @Post('fines')
  @Response<ValidateErrorJSON>(422, 'Validation Failed')
  @Response<InternalError>(500, 'Internal Server Error')
  @SuccessResponse(200, 'Ok')
  public async generateInvoice(
    @Body() params: FineRouteParams
  ): Promise<any> {
    let fileName: string = await new ReportService().generateFineReport(
      params.settings,
      params.params,
    );
    if (fileName === undefined)
      throw new ApiError(
        HTTPStatus.InternalServerError,
        'Something went wrong when generating a payout. No file was generated.'
      );
    return prepareFileResponse(this, fileName);
  }
}
