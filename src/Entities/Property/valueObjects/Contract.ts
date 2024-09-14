import { PositiveNumber } from "../../../Shared/valueObjects/primitives";

import BaseCustomError from "../../../Shared/valueObjects/BaseCustomError";
import formatters from '../../../Shared/valueObjects/formatters'


class InvalidContractValueError extends BaseCustomError {
  constructor(value: unknown, errorContext: string, message?: string, name?: string) {
    super({
      value,
      module: "Contract",
      message: message || `Contract: "${value}" is invalid, start date must a number or staring value in miliseconds between 01-01-2020 and 01-01-2100.`,
      name: name || 'InvalidContractValueError',
      context: errorContext
    })
  }
}

export class InvalidContractStartDateError extends InvalidContractValueError {
  constructor(value: unknown, errorContext: string) {
    super(
      value,
      errorContext,
      `Contract: startDate must be string or number value in miliseconds grather than "01-01-2020 = 1577858400000"`,
      'InvalidContractStartDateError',
    )
  }
}

export class InvalidContractEndDateError extends InvalidContractValueError {
  constructor(value: unknown, errorContext: string) {
    super(
      value,
      errorContext,
      `Contract: endDate must be string or number value in miliseconds less than "01-01-2100 = 4102466400000"`,
      'InvalidContractEndDateError',
    )
  }
}


export default class Contract {
  private readonly startDate!: number;
  private readonly endDate!: number;
  private readonly MINIMUM_DATE_IN_MILISECONDS = 1577858400000; // 01-01-2020
  private readonly MAXIMUM_DATE_IN_MILISECONDS = 4102466400000; // 01-01-2100
  private readonly MILISECONDS_IN_A_YEAR = 31557600000;
  private readonly dateFormatter = new formatters.DateFormatter();


  constructor(startDateInMiliSeconds: defaultTypeParameter, errorContext: string) {
    const { value: startDate } = new PositiveNumber(startDateInMiliSeconds, {
      module: 'Contract',
      name: 'InvalidContractEndDateError',
      context: errorContext
    });
    this.validateStartDate(startDate, errorContext)

    const endDate = startDate + this.MILISECONDS_IN_A_YEAR;
    this.validateEndDate(endDate, errorContext)

    this.startDate = startDate;
    this.endDate = endDate;

  }

  private validateStartDate(startDate: number, errorContext: string): void {
    if (startDate < this.MINIMUM_DATE_IN_MILISECONDS) {
      throw new InvalidContractStartDateError(startDate, errorContext);
    }
  }

  private validateEndDate(endDate: number, errorContext: string): void {
    if (endDate > this.MAXIMUM_DATE_IN_MILISECONDS) {
      throw new InvalidContractEndDateError(endDate, errorContext);
    }
  }

  get value() {
    return {
      startDate: { miliseconds: this.startDate, formatedDate: this.dateFormatter.format(this.startDate) },
      endDate: { miliseconds: this.endDate, formatedDate: this.dateFormatter.format(this.startDate) }
    }
  }

}