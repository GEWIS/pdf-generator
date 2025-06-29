import { Body, Controller, Post, Produces, Response, Route, SuccessResponse, Tags } from 'tsoa';
import { FileSettings, prepareFileResponse } from '../helpers/fileManager';
import { ApiError, HTTPStatus, InternalError, ValidateErrorJSON } from '../helpers/customError';
import ReportService, {
  FineReportParameters,
  UserReportParameters
} from '../services/reportService';

export interface FineRouteParams {
  params: FineReportParameters;
  settings: FileSettings;
}

export interface UserRouteParams {
  params: UserReportParameters;
  settings: FileSettings;
}

@Route('report')
@Produces('application/pdf+tex')
@Tags('Report')
export class ReportController extends Controller {
  /**
   * Generates a fine report as Tex or PDF file.
   */
  @Post('fines')
  @Response<ValidateErrorJSON>(422, 'Validation Failed')
  @Response<InternalError>(500, 'Internal Server Error')
  @SuccessResponse(200, 'Ok')
  public async generateFineReport(@Body() params: FineRouteParams): Promise<any> {
    let fileName: string = await new ReportService().generateFineReport(
      params.settings,
      params.params
    );
    if (fileName === undefined)
      throw new ApiError(
        HTTPStatus.InternalServerError,
        'Something went wrong when generating a report. No file was generated.'
      );
    return prepareFileResponse(this, fileName);
  }

  /**
   * Generates a sales report as Tex or PDF file.
   */
  @Post('user')
  @Response<ValidateErrorJSON>(422, 'Validation Failed')
  @Response<InternalError>(500, 'Internal Server Error')
  @SuccessResponse(200, 'Ok')
  public async generateUserReport(@Body() params: UserRouteParams): Promise<any> {
    let fileName: string = await new ReportService().generateUserReport(
      params.settings,
      params.params
    );
    if (fileName === undefined)
      throw new ApiError(
        HTTPStatus.InternalServerError,
        'Something went wrong when generating a report. No file was generated.'
      );
    return prepareFileResponse(this, fileName);
  }
}
