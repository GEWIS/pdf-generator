import { Body, Controller, Post, Produces, Response, Route, SuccessResponse, Tags } from 'tsoa';
import { FileSettings, prepareFileResponse } from '../helpers/fileManager';
import { ApiError, HTTPStatus, InternalError, ValidateErrorJSON } from '../helpers/customError';
import WriteOffService, { WriteOffParameters } from '../services/writeOffService';

export interface WriteOffRouteParams {
  params: WriteOffParameters;
  settings: FileSettings;
}

@Route('write-off')
@Produces('application/json')
@Tags('WriteOff')
export class WriteOffController extends Controller {
  @Post()
  @Response<ValidateErrorJSON>(422, 'Validation Failed')
  @Response<InternalError>(500, 'Internal Server Error')
  @SuccessResponse(200, 'Ok')
  public async generateWriteOff(@Body() params: WriteOffRouteParams): Promise<any> {
    let fileName: string = await new WriteOffService().generateWriteOff(
      params.settings,
      params.params
    );
    if (fileName === undefined)
      throw new ApiError(
        HTTPStatus.InternalServerError,
        'Something went wrong when generating a write-off. No file was generated.'
      );
    return prepareFileResponse(this, fileName);
  }
}
