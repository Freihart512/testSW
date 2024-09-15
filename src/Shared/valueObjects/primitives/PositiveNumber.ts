import BaseCustomError from "../BaseCustomError";
export class InvalidPositiveNumberError extends BaseCustomError {
  constructor(errorContext: CustomErrorContext) {
    super({
      message: errorContext.message || `The provided value "${errorContext.value}" is not a valid positive number. Expected a positive number greater or equal to 0`,
      module: errorContext.module || 'PositiveNumber',
      value: errorContext.value,
      name: errorContext.name || 'InvalidPositiveNumberError',
      context: errorContext.context,
    });
    Object.setPrototypeOf(this, InvalidPositiveNumberError.prototype);
  }
}

export default class PositiveNumber {
  readonly value: number;
  constructor(value: StringOrNumber, errorContext: Omit<CustomErrorContext, 'value'>) {
    const number = Number(value);
    if (Number.isNaN(number) || number <= 0) {
      throw new InvalidPositiveNumberError({ ...errorContext, value })
    }
    this.value = number;
  }
}
