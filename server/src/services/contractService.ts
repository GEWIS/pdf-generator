import * as asyncFileSystem from 'fs/promises';
import path from 'path';
import { ApiError, HTTPStatus } from '../helpers/customError';
import { ContractType } from '../controllers/contractController';
import LetterService, { BaseParameters, Identity, Language } from './letterService';
import finishFileGeneration, { FileSettings, Stationery } from '../helpers/fileManager';
import createPricingTable, {
  createProductList,
  createSpecificationList,
  Product,
  TotalPricing
} from '../helpers/componentGenerator';

export interface QuoteParameters extends BaseParameters {
  products: Product[];
  pricing: TotalPricing;
}

export interface ContractParameters extends QuoteParameters {
  firstSignee: Identity;
  secondSignee: Identity;
}

export default class ContractService {
  private readonly templateDir: string;

  private readonly stationeryDirGEWIS: string;

  private readonly stationeryDirBAC: string;

  private readonly quoteName: string;

  private readonly contractNameDutch: string;

  private readonly contractName: string;

  private readonly workDir: string;

  constructor() {
    if (
      !process.env.TEMPLATE_DIR ||
      !process.env.STATIONERY_DIR_GEWIS ||
      !process.env.STATIONERY_DIR_BAC ||
      !process.env.QUOTE_NAME ||
      !process.env.CONTRACT_NAME_DUTCH ||
      !process.env.CONTRACT_NAME ||
      !process.env.WORK_DIR
    )
      throw new ApiError(
        HTTPStatus.InternalServerError,
        'One or more environment variables has not been set'
      );

    this.templateDir = process.env.TEMPLATE_DIR;
    this.stationeryDirGEWIS = process.env.STATIONERY_DIR_GEWIS;
    this.stationeryDirBAC = process.env.STATIONERY_DIR_BAC;
    this.quoteName = process.env.QUOTE_NAME;
    this.contractNameDutch = process.env.CONTRACT_NAME_DUTCH;
    this.contractName = process.env.CONTRACT_NAME;
    this.workDir = process.env.WORK_DIR;
  }

  /**
   * Generate a file based on a contract. Can be an actual contract or a proposal
   * @param settings {FileSettings} The corresponding generation settings
   * @param parameters {ContractParameters} The parameters used for generating the contract
   * @param type {ContractType} The type of the contract
   * @param letterService {LetterService} Service for filling out letter
   * @returns {string} The absolute location of the generated file
   */
  public async generateContract(
    settings: FileSettings,
    parameters: ContractParameters,
    type: ContractType,
    letterService: LetterService
  ): Promise<string> {
    let templateLocation: string = '';
    // Since contract are inherently different, this extra step is necessary
    if (type === ContractType.QUOTE) {
      templateLocation = path.join(this.templateDir, this.quoteName);
    } else if (settings.language === Language.DUTCH) {
      templateLocation = path.join(this.templateDir, this.contractNameDutch);
    } else if (settings.language === Language.ENGLISH) {
      templateLocation = path.join(this.templateDir, this.contractName);
    }

    let fileBuffer: Buffer | void = await asyncFileSystem
      .readFile(templateLocation)
      .catch((e: Error): void => {
        throw new ApiError(
          HTTPStatus.InternalServerError,
          'Template files for contract are (temporarily) missing. \n\n' + e
        );
      });
    let contract: string = fileBuffer!.toString();

    contract = letterService.generateBaseTexLetter(
      contract,
      settings.language,
      parameters.subject,
      parameters.sender,
      parameters.recipient,
      parameters.company,
      parameters.dates,
      parameters.address,
      parameters.reference
    );

    contract = createProductList(contract, parameters.products);
    contract = createPricingTable(contract, parameters.products, parameters.pricing);

    contract = createSpecificationList(contract, parameters.products);
    contract = letterService.createSignees(
      contract,
      parameters.firstSignee,
      parameters.secondSignee
    );

    return finishFileGeneration(
      contract,
      settings.fileType,
      this.workDir,
      settings.stationery === Stationery.GEWIS ? this.stationeryDirGEWIS : this.stationeryDirBAC
    );
  }
}
