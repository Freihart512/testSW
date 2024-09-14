import BaseCustomError from "../BaseCustomError";

type InvalidPositiveNumberErrorConfig = WithRequired<Omit<BaseCustomErrorConfig, 'message'>, 'value'>
type configErrorPositiveNumber = Omit<InvalidPositiveNumberErrorConfig, 'value'>

export class InvalidPositiveNumberError extends BaseCustomError {
  constructor(configError: InvalidPositiveNumberErrorConfig) {
    super({
      ...configError,
      message: `The provided value "${configError.value}" is not a valid positive number.`,
    });
    Object.setPrototypeOf(this, InvalidPositiveNumberError.prototype);
  }
}

export default class PositiveNumber {
  protected readonly _value: number;
  constructor(value: number | string, configError: configErrorPositiveNumber) {
    const number = Number(value);
    if (Number.isNaN(number) || number <= 0) {
      throw new InvalidPositiveNumberError({ ...configError, value })
    }
    this._value = number;
  }

  get value() {
    return this._value;
  }
}
