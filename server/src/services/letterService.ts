import countries from '../helpers/countries.json';
import { replaceAll, replaceAllSafe } from '../helpers/replaceAll';
import { ApiError, HTTPStatus } from '../helpers/customError';

export enum Language {
  DUTCH = 'DUTCH',
  ENGLISH = 'ENGLISH'
}

export interface Identity {
  firstName: string;
  lastNamePreposition: string;
  lastName: string;
  fullName: string;
  function?: string;
}

export interface Dates {
  date: Date;
  dueDate?: Date;
  dueDays?: number;
  startDate?: Date;
  endDate?: Date;
}

export interface Company {
  name: string;
  id?: string;
}

export interface Address {
  street: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface References {
  ourReference?: string;
  yourReference?: string;
}

export interface BaseParameters {
  subject: string;
  sender: Identity;
  recipient: Identity;
  dates: Dates;
  company: Company;
  address: Address;
  reference?: References;
}

export interface Country {
  Code: string;
  Name: string;
}

export default class LetterService {
  private readonly defaultDueDays: number;

  constructor() {
    if (!process.env.DEFAULT_DUE_DAYS)
      throw new ApiError(
        HTTPStatus.InternalServerError,
        'One or more environment variables has not been set'
      );

    this.defaultDueDays = parseInt(process.env.DEFAULT_DUE_DAYS);
  }

  /**
   * Given the letter string, replace the "basic" placeholder strings with actual information
   * @param letter {string} Template file
   * @param language {Language} Language to be used
   * @param subject {string} Subject of the letter
   * @param sender {Identity} Sender of the letter
   * @param recipient {Identity} Receiver of the letter
   * @param company {Company} Company letter is addressed to
   * @param dates {Dates} Date information of the letter
   * @param address {Address} Address noted on the letter
   * @param reference {References} References used on the letter
   */
  public generateBaseTexLetter(
    letter: string,
    language: Language,
    subject: string,
    sender: Identity,
    recipient: Identity,
    company: Company,
    dates: Dates,
    address: Address,
    reference?: References
  ): string {
    if (language === Language.DUTCH) {
      letter = replaceAll(letter, '{{language}}', 'dutch');
    }

    letter = replaceAllSafe(letter, '{{contactperson}}', recipient.fullName);
    letter = replaceAllSafe(letter, '{{company}}', company.name);
    letter = replaceAllSafe(letter, '{{subject}}', subject);

    letter = replaceAllSafe(letter, '{{sender}}', sender.fullName);
    letter = replaceAllSafe(letter, '{{senderfunction}}', sender.function ?? '');

    letter = replaceAll(letter, '{{dateday}}', dates.date.getDate().toString());
    letter = replaceAll(letter, '{{datemonth}}', (dates.date.getMonth() + 1).toString());
    letter = replaceAll(letter, '{{dateyear}}', dates.date.getFullYear().toString());

    const companyCountry: Country | undefined = countries.find(
      (country: Country): boolean => country.Code === address.country.toUpperCase()
    );
    letter = replaceAll(letter, '{{street}}', address.street);
    letter = replaceAll(letter, '{{postalcode}}', address.postalCode);
    letter = replaceAll(letter, '{{city}}', address.city);
    letter = replaceAll(
      letter,
      '{{country}}',
      companyCountry ? companyCountry.Name : address.country
    );

    letter = replaceAll(
      letter,
      '{{ourreference}}',
      reference ? reference.ourReference ?? '-' : '-'
    );
    letter = replaceAllSafe(
      letter,
      '{{yourreference}}',
      reference ? reference.yourReference ?? '-' : '-'
    );

    let dueDate: Date;
    if (dates.dueDate) {
      dueDate = dates.dueDate;
    } else {
      dueDate = new Date(dates.date);
      if (dates.dueDays) {
        dueDate.setDate(dates.date.getDate() + dates.dueDays);
      } else {
        dueDate.setDate(dates.date.getDate() + this.defaultDueDays);
      }
    }

    letter = replaceAll(letter, '{{dueday}}', dueDate.getDate().toString());
    letter = replaceAll(letter, '{{duemonth}}', (dueDate.getMonth() + 1).toString());
    letter = replaceAll(letter, '{{dueyear}}', dueDate.getFullYear().toString());

    letter = replaceAll(letter, '{{debtornumber}}', company.id ?? '-');

    return letter;
  }

  /**
   * Add signees to the letter
   * @param file {string} The .tex file, parsed as a string
   * @param firstSignee {Identity} The first signee
   * @param secondSignee {Identity} The second signee
   * @returns {string} The letter with signees added
   */
  public createSignees(file: string, firstSignee: Identity, secondSignee: Identity): string {
    file = replaceAllSafe(file, '{{firstcontractor}}', firstSignee.fullName);
    file = replaceAllSafe(file, '{{firstcontractorfunction}}', firstSignee.function ?? '');
    file = replaceAllSafe(file, '{{secondcontractor}}', secondSignee.fullName);
    file = replaceAllSafe(file, '{{secondcontractorfunction}}', secondSignee.function ?? '');
    return file;
  }
}
