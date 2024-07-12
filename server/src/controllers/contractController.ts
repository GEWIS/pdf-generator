import { Body, Controller, Post, Produces, Route, SuccessResponse, Tags, Response } from 'tsoa';
import ContractService, { ContractParameters } from '../services/contractService';
import { FileSettings, prepareFileResponse } from '../helpers/fileManager';
import { ApiError, HTTPStatus, InternalError, ValidateErrorJSON } from '../helpers/customError';
import LetterService from '../services/letterService';

export enum ContractType {
  CONTRACT = 'contract',
  QUOTE = 'quote'
}

export interface ContractRouteParams {
  params: ContractParameters;
  settings: FileSettings;
}

@Route('contract')
@Produces('application/pdf+tex')
@Tags('Contract')
export class ContractController extends Controller {
  /**
   * Generates a contract as Tex of PDF file.
   * Supply all contract parameters and contract type and receive the corresponding contract
   */
  @Post('{type}')
  @Response<ValidateErrorJSON>(422, 'Validation Failed')
  @Response<InternalError>(500, 'Internal Server Error')
  @SuccessResponse(200, 'Ok')
  public async generateContract(
    type: ContractType,
    @Body() params: ContractRouteParams
  ): Promise<any> {
    let letterService: LetterService = new LetterService();
    let fileName: string = await new ContractService().generateContract(
      params.settings,
      params.params,
      type,
      letterService
    );
    if (fileName === undefined)
      throw new ApiError(
        HTTPStatus.InternalServerError,
        'Something went wrong when generating a contract or quote. No file was generated.'
      );
    return prepareFileResponse(this, fileName);
  }
}
