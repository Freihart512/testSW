import BaseCustomError from "../BaseCustomError";
type EmptyStringErrorConfig = Omit<BaseCustomErrorConfig, 'message' | 'value'>

export class EmptyStringError extends BaseCustomError {
  constructor(context?: string) {
    super({
      context,
      module: 'NoEmptyString',
      name: 'EmptyStringError',
      message: 'String value cannot be empty.'
    });
    Object.setPrototypeOf(this, EmptyStringError.prototype);
  }
}

export default class NoEmptyString {
  readonly value: string
  constructor(value: string, errorContext: string) {
    if (!value || value.trim().length === 0) {
      throw new EmptyStringError(errorContext)
    }
    this.value = value;
  }
}