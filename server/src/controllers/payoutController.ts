import { Body, Controller, Post, Produces, Response, Route, SuccessResponse, Tags } from 'tsoa';
import { FileSettings, prepareFileResponse } from '../helpers/fileManager';
import { ApiError, HTTPStatus, InternalError, ValidateErrorJSON } from '../helpers/customError';
import PayoutService, { PayoutParameters } from '../services/payoutService';


export interface PayoutRouteParams {
  params: PayoutParameters;
  settings: FileSettings;
}

@Route('payout')
@Produces('application/pdf+tex')
@Tags('Payout')
export class PayoutController extends Controller {
  /**
   * Generates a payout as Tex of PDF file.
   * Supply all payout parameters and receive the corresponding payout
   */
  @Post()
  @Response<ValidateErrorJSON>(422, 'Validation Failed')
  @Response<InternalError>(500, 'Internal Server Error')
  @SuccessResponse(200, 'Ok')
  public async generatePayout(
    @Body() params: PayoutRouteParams
  ): Promise<any> {
    let fileName: string = await new PayoutService().generatePayout(
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
